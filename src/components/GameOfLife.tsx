'use client';

import { useState } from 'react';
import ClickListener from './ClickListener';
import Grid from './Grid';
import LiveCells from './LiveCells';
import { GameState } from '@/types/GameState';

const GameOfLife = () => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
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

  const moveCenter = ([x, y]: [number, number]) => {
    setCenter((prev) => [prev[0] - x, prev[1] - y]);
  };

  return (
    <>
      <Grid center={center} />
      <LiveCells cells={liveCells} center={center} />
      <ClickListener
        onSquareClicked={onSquareClicked}
        onNavigate={moveCenter}
        center={center}
      />
    </>
  );
};

export default GameOfLife;
