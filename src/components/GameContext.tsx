'use client';

import getNextState from '@/helpers/getNextState';
import { GameState } from '@/types/GameState';
import { useRouter } from 'next/navigation';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useInterval } from 'usehooks-ts';

const GameContext = createContext<{
  name: string;
  setName: (val: string) => void;
  gameState: GameState;
  playing: boolean;
  setPlaying: (val: boolean) => void;
  togglePlay: () => void;
  speed: number;
  setSpeed: (val: number) => void;
  next: (skip: number) => void;
  reset: () => void;
  setCell: (coords: [number, number], val: boolean) => void;
  save: () => void;
}>({} as unknown as any);

const GameProvider: FC<PropsWithChildren<{ gameId?: string }>> = ({
  children,
  gameId,
}) => {
  const [gameState, setGameState] = useState<GameState>({});
  const [name, setName] = useState<string>('');

  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    if (!playing) next();
    setPlaying((p) => !p);
  };

  const next = (steps = 1) => {
    let newState = gameState;
    for (let i = 0; i < steps; i++) {
      newState = getNextState(newState);
    }

    setGameState(newState);
  };

  const reset = () => {
    setGameState({});
    setPlaying(false);
  };

  const router = useRouter();

  const save = async () => {
    if (gameId) {
      fetch('/api/game/' + gameId, {
        method: 'PUT',
        body: JSON.stringify({ state: gameState, name }),
      });

      return;
    }

    const res = await fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify({ state: gameState, name }),
    });
    const id = await res.json();
    router.push('/life/' + id);
  };

  const setCell = ([x, y]: [number, number], value: boolean) => {
    setGameState((prev) => {
      const liveCells = JSON.parse(JSON.stringify(prev));
      if (!liveCells[x]) liveCells[x] = {};

      if (liveCells[x][y] === value) return liveCells;

      liveCells[x][y] = value;

      return liveCells;
    });
  };

  useInterval(next, playing ? 1000 / speed : null);

  useEffect(() => {
    fetch('/api/game/' + gameId)
      .then((res) => res.json())
      .then(
        (data: { name: string; state: GameState }) => (
          setGameState(data.state || {}), setName(data.name || '')
        ),
      );
  }, [gameId]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        next,
        reset,
        save,
        setCell,
        speed,
        setSpeed,
        playing,
        setPlaying,
        togglePlay,
        name,
        setName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;

export const useGame = () => {
  return useContext(GameContext);
};
