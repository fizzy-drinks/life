'use client';

import { useEffect, useState } from 'react';

const Grid = () => {
  const [screenSize, setScreenSize] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    setScreenSize([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', () =>
      setScreenSize([window.innerWidth, window.innerHeight]),
    );
  }, []);

  const screenCenter = screenSize.map((n) => Math.floor(n / 2));
  const gridOffset = screenCenter.map((n) => (n % 32) - 1);

  return (
    <div
      className='w-full h-full absolute top-0 left-0'
      style={{
        backgroundImage: `
    linear-gradient(to right, grey 1px, grey 2px, transparent 3px),
    linear-gradient(to bottom, grey 1px, grey 2px, transparent 3px)
    
    `,
        backgroundSize: '32px 32px',
        backgroundPosition: gridOffset.map((n) => n + 'px').join(' '),
      }}
    />
  );
};

export default Grid;
