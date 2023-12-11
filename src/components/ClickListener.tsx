'use client';

import { FC, MouseEventHandler, useState } from 'react';

const ClickListener: FC<{
  onSquareClicked: (squareCoords: [number, number]) => void;
  onNavigate: (delta: [number, number]) => void;
  center: [number, number];
}> = ({ onSquareClicked, onNavigate, center }) => {
  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const { innerWidth: w, innerHeight: h } = window;
    onSquareClicked(
      [
        event.pageX + center[0] - Math.floor(w / 2),
        event.pageY + center[1] - Math.floor(h / 2),
      ].map((n) => Math.floor(n / 32)) as [number, number],
    );
  };

  const [dragging, setDragging] = useState(false);
  const [initial, setInitial] = useState<[number, number]>([0, 0]);
  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setDragging(true);
    setInitial([event.clientX, event.clientY]);
  };

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!dragging) return;

    setInitial([event.clientX, event.clientY]);
    onNavigate([event.clientX - initial[0], event.clientY - initial[1]]);
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
    setDragging(false);
  };

  return (
    <div
      className='w-full h-full absolute top-0 left-0'
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
};

export default ClickListener;
