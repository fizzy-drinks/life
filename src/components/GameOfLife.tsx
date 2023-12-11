'use client';

import { useState } from 'react';
import ClickListener from './ClickListener';
import Grid from './Grid';
import LiveCells from './LiveCells';
import { GameState } from '@/types/GameState';
import { useInterval } from 'usehooks-ts';

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

  const neighbourCoords = (x: number, y: number): [number, number][] => [
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
  ];

  const neighbourCount = (x: number, y: number): number => {
    const all = neighbourCoords(x, y).map(
      ([x, y]) => liveCells[x]?.[y] === true,
    );

    return all.reduce((a, i) => a + Number(i), 0);
  };

  const next = () => {
    const newState: GameState = {};

    Object.entries(liveCells).forEach(([x, row]) => {
      Object.entries(row)
        .filter(([, active]) => active)
        .forEach(([y]) => {
          const nx = Number(x);
          const ny = Number(y);

          const deadNeighbours = neighbourCoords(nx, ny).filter(
            ([x, y]) => liveCells[x]?.[y] !== true,
          );

          deadNeighbours.forEach(([x, y]) => {
            const liveNeighbours = neighbourCount(x, y);
            if (liveNeighbours !== 3) return;

            if (!newState[x]) newState[x] = {};

            newState[x][y] = true;
          });

          const liveNeighbours = neighbourCount(nx, ny);
          if (liveNeighbours < 2 || liveNeighbours > 3) return;

          if (!newState[nx]) newState[nx] = {};

          newState[nx][ny] = true;
        });
    });

    setLiveCells(newState);
  };

  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    if (!playing) next();
    setPlaying((p) => !p);
  };

  useInterval(next, playing ? 1000 : null);

  return (
    <>
      <Grid center={center} />
      <LiveCells cells={liveCells} center={center} />
      <ClickListener
        onSquareClicked={onSquareClicked}
        onNavigate={moveCenter}
        center={center}
      />
      <div className='bg-white p-4 text-lg text-black absolute'>
        <button onClick={next} className='rounded border-2 border-black p-2'>
          Next
        </button>
        <button
          onClick={togglePlay}
          className='rounded border-2 border-black p-2'
        >
          {playing ? 'Stop' : 'Play'}
        </button>
        <button
          onClick={() => setLiveCells({})}
          className='rounded border-2 border-black p-2'
        >
          Clear
        </button>
      </div>
    </>
  );
};

export default GameOfLife;
