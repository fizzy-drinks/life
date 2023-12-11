'use client';

import getNextState from '@/helpers/getNextState';
import { GameState } from '@/types/GameState';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
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
  toggleCell: (val: [number, number]) => void;
}>({} as unknown as any);

const GameProvider: FC<PropsWithChildren> = ({ children }) => {
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

  const toggleCell = ([x, y]: [number, number]) => {
    setGameState((prev) => {
      const liveCells = JSON.parse(JSON.stringify(prev));
      if (liveCells[x]?.[y]) {
        liveCells[x][y] = false;
      } else {
        if (!liveCells[x]) liveCells[x] = {};

        liveCells[x][y] = true;
      }

      return liveCells;
    });
  };

  useInterval(next, playing ? 1000 / speed : null);

  return (
    <GameContext.Provider
      value={{
        gameState,
        next,
        reset,
        toggleCell,
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
