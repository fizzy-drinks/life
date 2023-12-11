'use client';

import { GameState } from '@/types/GameState';
import { FC } from 'react';

const LiveCells: FC<{ cells: GameState }> = ({ cells }) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      {Object.entries(cells).map(([x, row]) =>
        Object.entries(row)
          .filter(([, live]) => live)
          .map(([y]) => (
            <div
              key={`${x}-${y}`}
              className='absolute w-[32px] h-[32px] border-red-400 border-2'
              style={{
                top: window.innerHeight / 2 + Number(y) * 32 - 1,
                left: window.innerWidth / 2 + Number(x) * 32 - 1,
              }}
            />
          )),
      )}
    </div>
  );
};

export default LiveCells;
