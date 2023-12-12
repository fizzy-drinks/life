'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { GameState } from '@/types/GameState';

import Button from './Button';
import { useGame } from './GameContext';
import { useVisualisation } from './VisualisationContext';

const Controls: FC<{ onHelp: () => void }> = ({ onHelp }) => {
  const { playing, togglePlay, speed, setSpeed, next, reset, gameId } =
    useGame();
  const { color, setColor } = useVisualisation();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);

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
          m-2 mx-auto flex justify-center gap-8 items-center
          bg-gray-700 py-4 px-6 text-lg rounded
        '
      >
        <div className='flex flex-col gap-4 h-full grow'>
          <h1 className='text-center'>Create & edit</h1>
          <div className='flex gap-2 items-center text-sm'>
            <Button
              onClick={reset}
              className='flex flex-col gap-1 items-center'
            >
              Clear <span>🧹</span>
            </Button>
            <label className='flex flex-col gap-2 items-center'>
              📓 Presets
              <select
                onChange={(e) => router.push('/life/' + e.target.value)}
                value={gameId}
                className='rounded bg-gray-500 text-black text-sm'
              >
                <option key='__new__' value=''>
                  Create new...
                </option>
                {saves.map((save) => (
                  <option key={save.id} value={save.id}>
                    {save.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className='flex flex-col gap-4 grow-1 h-full justify-between'>
          <h1 className='text-center'>Navigate & view</h1>
          <div className='flex gap-2 items-center justify-center text-sm'>
            <label className='flex flex-col gap-2 items-center'>
              ⏩ Step
              <input
                type='number'
                onChange={(e) => setStep(Number(e.target.value))}
                value={step}
                className='text-black w-12 text-right rounded bg-gray-500 text-sm h-7 m-0'
              />
            </label>
            <Button
              onClick={() => next(step)}
              className='flex flex-col gap-1 items-center'
            >
              Next<span>⏭</span>
            </Button>
            <Button
              onClick={togglePlay}
              className='flex flex-col gap-1 items-center'
            >
              {playing ? (
                <>
                  Stop <span>🛑</span>
                </>
              ) : (
                <>
                  Play<span>⏯</span>
                </>
              )}
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-4 justify-between h-full grow'>
          <h1 className='text-center'>Options</h1>
          <div className='flex gap-2 items-center text-sm'>
            <label className='flex flex-col justify-center items-center gap-2'>
              🖌 Color
              <input
                type='color'
                onChange={(e) => setColor(e.target.value)}
                value={color}
                className='bg-transparent h-7'
              />
            </label>
            <label className='flex flex-col items-center gap-2'>
              🏃‍♀️ Playback speed
              <input
                type='range'
                min={1}
                max={5}
                onChange={(e) => setSpeed(Number(e.target.value))}
                value={speed}
                className='h-7'
              />
            </label>
            <Button
              onClick={onHelp}
              className='flex flex-col gap-1 items-center'
            >
              Help <span>🆘</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
