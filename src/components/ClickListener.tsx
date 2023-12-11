'use client';

import { FC, MouseEventHandler, useState } from 'react';
import { useGame } from './GameContext';
import { useVisualisation } from './VisualisationContext';

const ClickListener: FC = () => {
  const { setCell, gameState } = useGame();
  const { center, moveCenter } = useVisualisation();

  const [dragging, setDragging] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [initial, setInitial] = useState<[number, number]>([0, 0]);

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setDragging(false);
    setDrawing(false);
    setErasing(false);
  };

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.button !== 0) {
      setInitial([event.clientX, event.clientY]);
      setDragging(true);
      return;
    }

    const { innerWidth: w, innerHeight: h } = window;

    const [x, y] = [
      event.pageX + center[0] - Math.floor(w / 2),
      event.pageY + center[1] - Math.floor(h / 2),
    ].map((n) => Math.floor(n / 32)) as [number, number];

    if (gameState[x]?.[y] === true) {
      setErasing(true);
      setCell([x, y], false);
    } else {
      setDrawing(true);
      setCell([x, y], true);
    }
  };

  const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (dragging) {
      setInitial([event.clientX, event.clientY]);
      moveCenter([event.clientX - initial[0], event.clientY - initial[1]]);
      return;
    }

    if (drawing || erasing) {
      const { innerWidth: w, innerHeight: h } = window;
      setCell(
        [
          event.pageX + center[0] - Math.floor(w / 2),
          event.pageY + center[1] - Math.floor(h / 2),
        ].map((n) => Math.floor(n / 32)) as [number, number],
        drawing,
      );
      return;
    }
  };

  return (
    <div
      className='w-full h-full absolute top-0 left-0'
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={() => setDragging(false)}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
};

export default ClickListener;
