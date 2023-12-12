'use client';

import { FC, useEffect, useState } from 'react';
import { useVisualisation } from './VisualisationContext';

const Grid: FC = () => {
  const { center } = useVisualisation();

  const [screenSize, setScreenSize] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    setScreenSize([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', () =>
      setScreenSize([window.innerWidth, window.innerHeight]),
    );
  }, []);

  const screenCenter = screenSize.map((n) => Math.floor(n / 2));
  const gridOffset = screenCenter.map(
    (n, i) => (n % 32) - 0.5 - (center[i] % 32),
  );

  return (
    <div
      className='w-full h-full absolute top-0 left-0'
      style={{
        backgroundImage: `
          linear-gradient(to right, grey 1px, transparent 2px, transparent 31px, grey 32px),
          linear-gradient(to bottom, grey 1px, transparent 2px, transparent 31px, grey 32px)
        `,
        backgroundSize: '32px 32px',
        backgroundPosition: gridOffset.map((n) => n + 'px').join(' '),
      }}
    />
  );
};

export default Grid;
