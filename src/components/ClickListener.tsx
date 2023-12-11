'use client';

import { FC, MouseEventHandler, useState } from 'react';
import { useGame } from './GameContext';
import { useVisualisation } from './VisualisationContext';

const ClickListener: FC = () => {
  const { toggleCell } = useGame();
  const { center, moveCenter } = useVisualisation();

  const [dragging, setDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [initial, setInitial] = useState<[number, number]>([0, 0]);

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (hasDragged) {
      setDragging(false);
      setHasDragged(false);
      return;
    }

    setDragging(false);

    const { innerWidth: w, innerHeight: h } = window;
    toggleCell(
      [
        event.pageX + center[0] - Math.floor(w / 2),
        event.pageY + center[1] - Math.floor(h / 2),
      ].map((n) => Math.floor(n / 32)) as [number, number],
    );
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setDragging(true);
    setInitial([event.clientX, event.clientY]);
  };

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!dragging) return;

    setHasDragged(true);
    setInitial([event.clientX, event.clientY]);
    moveCenter([event.clientX - initial[0], event.clientY - initial[1]]);
  };

  return (
    <div
      className='w-full h-full absolute top-0 left-0'
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    />
  );
};

export default ClickListener;
