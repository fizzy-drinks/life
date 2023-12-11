'use client';

import { useState } from 'react';
import ClickListener from './ClickListener';
import Grid from './Grid';
import LiveCells from './LiveCells';
import { GameState } from '@/types/GameState';

const GameOfLife = () => {
  const [liveCells, setLiveCells] = useState<GameState>({});
  const onSquareClicked = ([x, y]: [number, number]) => {
    setLiveCells((prev) => {
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

  return (
    <>
      <Grid />
      <LiveCells cells={liveCells} />
      <ClickListener onSquareClicked={onSquareClicked} />
    </>
  );
};

export default GameOfLife;
