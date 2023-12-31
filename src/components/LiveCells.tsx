'use client';

import { FC } from 'react';

import { useGame } from './GameContext';
import { useVisualisation } from './VisualisationContext';

const LiveCells: FC = () => {
  const { gameState } = useGame();
  const { center, color } = useVisualisation();

  const isCellLive = (x: number, y: number) => gameState[x]?.[y] === true;

  return (
    <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
      {Object.entries(gameState).map(([x, row]) =>
        Object.entries(row)
          .filter(([, live]) => live)
          .map(([y]) => (
            <div
              key={`${x}-${y}`}
              className='absolute w-[32px] h-[32px] border-2 rounded'
              style={{
                top: window.innerHeight / 2 + Number(y) * 32 - center[1],
                left: window.innerWidth / 2 + Number(x) * 32 - center[0],
                boxShadow: color + ' 0 0 5px 2px inset',
                borderColor: color,
                borderTopWidth: isCellLive(Number(x), Number(y) - 1) ? 0 : 2,
                borderBottomWidth: isCellLive(Number(x), Number(y) + 1) ? 0 : 2,
                borderLeftWidth: isCellLive(Number(x) - 1, Number(y)) ? 0 : 2,
                borderRightWidth: isCellLive(Number(x) + 1, Number(y)) ? 0 : 2,
                borderTopLeftRadius:
                  isCellLive(Number(x) - 1, Number(y)) ||
                  isCellLive(Number(x), Number(y) - 1) ||
                  isCellLive(Number(x) - 1, Number(y) - 1)
                    ? 0
                    : '0.25rem',
                borderTopRightRadius:
                  isCellLive(Number(x) + 1, Number(y)) ||
                  isCellLive(Number(x), Number(y) - 1) ||
                  isCellLive(Number(x) + 1, Number(y) - 1)
                    ? 0
                    : '0.25rem',
                borderBottomRightRadius:
                  isCellLive(Number(x) + 1, Number(y)) ||
                  isCellLive(Number(x), Number(y) + 1) ||
                  isCellLive(Number(x) + 1, Number(y) + 1)
                    ? 0
                    : '0.25rem',
                borderBottomLeftRadius:
                  isCellLive(Number(x) - 1, Number(y)) ||
                  isCellLive(Number(x), Number(y) + 1) ||
                  isCellLive(Number(x) - 1, Number(y) + 1)
                    ? 0
                    : '0.25rem',
              }}
            />
          )),
      )}
    </div>
  );
};

export default LiveCells;
