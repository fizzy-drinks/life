'use client';

import getNextState from '@/helpers/getNextState';
import { GameState } from '@/types/GameState';
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
  gameState: GameState;
  playing: boolean;
  setPlaying: (val: boolean) => void;
  togglePlay: () => void;
  speed: number;
  setSpeed: (val: number) => void;
  next: (skip: number) => void;
  reset: () => void;
  setCell: (coords: [number, number], val: boolean) => void;
}>({} as unknown as any);

const GameProvider: FC<PropsWithChildren<{ gameId?: string }>> = ({
  children,
  gameId,
}) => {
  const [gameState, setGameState] = useState<GameState>({});

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

  const setCell = ([x, y]: [number, number], value: boolean) => {
    setGameState((prev) => {
      const liveCells = JSON.parse(JSON.stringify(prev));
      if (!liveCells[x]) liveCells[x] = {};

      if (liveCells[x][y] === value) return liveCells;

      liveCells[x][y] = value;

      gameId &&
        fetch('/api/game/' + gameId, {
          method: 'PUT',
          body: JSON.stringify(liveCells),
        });

      return liveCells;
    });
  };

  useInterval(next, playing ? 1000 / speed : null);

  useEffect(() => {
    fetch('/api/game/' + gameId)
      .then((res) => res.json())
      .then(setGameState);
  }, [gameId]);

  return (
    <GameContext.Provider
      value={{
        gameState,
        next,
        reset,
        setCell,
        speed,
        setSpeed,
        playing,
        setPlaying,
        togglePlay,
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
