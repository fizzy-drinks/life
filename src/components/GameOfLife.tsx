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

  const neighbourCount = (state: GameState, x: number, y: number): number => {
    const all = neighbourCoords(x, y).map(([x, y]) => state[x]?.[y] === true);

    return all.reduce((a, i) => a + Number(i), 0);
  };

  const getNextState = (state: GameState): GameState => {
    const newState: GameState = {};

    Object.entries(state).forEach(([x, row]) => {
      Object.entries(row)
        .filter(([, active]) => active)
        .forEach(([y]) => {
          const nx = Number(x);
          const ny = Number(y);

          const deadNeighbours = neighbourCoords(nx, ny).filter(
            ([x, y]) => state[x]?.[y] !== true,
          );

          deadNeighbours.forEach(([x, y]) => {
            const liveNeighbours = neighbourCount(state, x, y);
            if (liveNeighbours !== 3) return;

            if (!newState[x]) newState[x] = {};

            newState[x][y] = true;
          });

          const liveNeighbours = neighbourCount(state, nx, ny);
          if (liveNeighbours < 2 || liveNeighbours > 3) return;

          if (!newState[nx]) newState[nx] = {};

          newState[nx][ny] = true;
        });
    });

    return newState;
  };

  const next = (steps = 1) => {
    let newState = liveCells;
    for (let i = 0; i < steps; i++) {
      newState = getNextState(newState);
    }

    setLiveCells(newState);
  };

  const [speed, setSpeed] = useState(1);
  const [playing, setPlaying] = useState(false);
  const togglePlay = () => {
    if (!playing) next();
    setPlaying((p) => !p);
  };

  useInterval(next, playing ? 1000 / speed : null);

  const [skip, setSkip] = useState<number>(5);

  return (
    <>
      <Grid center={center} />
      <LiveCells cells={liveCells} center={center} />
      <ClickListener
        onSquareClicked={onSquareClicked}
        onNavigate={moveCenter}
        center={center}
      />
      <div className='absolute bottom-0 w-full flex justify-center'>
        <div
          className='
            m-2 mx-auto flex justify-center gap-2 items-center
            bg-gray-700 py-2 px-6 text-lg rounded
          '
        >
          <button
            onClick={() => next()}
            className='rounded border-2 border-gray-500 p-2'
          >
            Next
          </button>
          <button
            onClick={togglePlay}
            className='rounded border-2 border-gray-500 p-2'
          >
            {playing ? 'Stop' : 'Play'}
          </button>
          <button
            onClick={() => setLiveCells({})}
            className='rounded border-2 border-gray-500 p-2'
          >
            Clear
          </button>
          <div className='p-2'>
            <label htmlFor='speed' className='block text-center'>
              Speed
            </label>
            <input
              id='speed'
              type='range'
              min={1}
              max={5}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className='p-2'>
            <label className='block text-center'>
              Advance{' '}
              <input
                type='number'
                onChange={(e) => setSkip(Number(e.target.value))}
                value={skip}
                className='text-black w-12 text-right rounded bg-gray-500 my-1'
              />{' '}
              steps
            </label>
            <button
              className='w-full border-2 rounded border-gray-500 p-1'
              onClick={() => next(skip)}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameOfLife;
