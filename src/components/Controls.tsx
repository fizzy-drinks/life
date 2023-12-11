import { FC, useState } from 'react';
import { useGame } from './GameContext';
import { useVisualisation } from './VisualisationContext';

const Controls: FC = () => {
  const { playing, togglePlay, setSpeed, setPlaying, next, reset } = useGame();
  const { color, setColor } = useVisualisation();

  const [skip, setSkip] = useState<number>(5);

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
            className='rounded bg-transparent'
          />
        </div>
      </div>
    </div>
  );
};

export default Controls;
