'use client';

import { FC, useEffect, useState } from 'react';
import { useGame } from './GameContext';
import { useVisualisation } from './VisualisationContext';
import { useRouter } from 'next/navigation';
import { GameState } from '@/types/GameState';

const Controls = () => {
  const { playing, togglePlay, setSpeed, setName, name, next, reset, save } =
    useGame();
  const { color, setColor } = useVisualisation();
  const router = useRouter();

  const [skip, setSkip] = useState<number>(5);

  const [saves, setSaves] = useState<
    { id: string; name: string; state: GameState }[]
  >([]);
  useEffect(() => {
    fetch('/api/game')
      .then((res) => res.json())
      .then((data: Record<string, { name: string; state: GameState }>) =>
        setSaves(
          Object.entries(data).map(([id, { name, state }]) => ({
            id,
            name,
            state,
          })),
        ),
      );
  }, []);

  return (
    <div className='absolute bottom-0 w-full flex justify-center'>
      <div
        className='
          m-2 mx-auto flex justify-center gap-2 items-center
          bg-gray-700 py-2 px-6 text-lg rounded
        '
      >
        <button
          onClick={() => next(1)}
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
          onClick={reset}
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
        <div className='p-2'>
          <label htmlFor='color' className='block text-center'>
            Color
          </label>
          <input
            id='color'
            type='color'
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className='bg-transparent'
          />
        </div>
        <div className='p-2'>
          <label htmlFor='name' className='block text-center'>
            Name
          </label>
          <input
            id='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
            className='rounded bg-gray-500 text-black text-center w-20 my-1'
          />
        </div>
        <div className='p-2'>
          <button
            className='w-full border-2 rounded border-gray-500 p-1'
            onClick={save}
          >
            Save
          </button>
        </div>
        <div className='p-2'>
          <label htmlFor='load' className='block text-center'>
            Load
          </label>
          <select
            id='load'
            onChange={(e) => router.push('/life/' + e.target.value)}
            value={color}
            className='rounded bg-gray-500 text-black p-1'
          >
            {saves.map((save) => (
              <option key={save.id} value={save.id}>
                {save.name}
              </option>
            ))}
            <option key='__new__' value=''>
              Create new...
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Controls;
