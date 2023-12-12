'use client';

import clsx from 'clsx';
import { FC } from 'react';

import Button from './Button';
import { Heading, Paragraph } from './Typography';

const Tutorial: FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  return (
    <div
      className={clsx(
        'fixed bg-[#fff9] top-0 left-0 w-full h-full flex justify-center items-center transition-all',
        { 'opacity-0 invisible': !visible },
      )}
    >
      <div className='rounded-lg bg-slate-800 text-white p-5 max-w-lg'>
        <Heading>Welcome to Life</Heading>
        <Paragraph>
          This is a web implementation of Conway&apos;s Game of Life.
        </Paragraph>
        <Paragraph>
          ✏ To <strong>draw</strong>, click on empty cells in the grid. You can
          also drag to draw multiple cells at once!
        </Paragraph>
        <Paragraph>
          ❌ To <strong>erase</strong>, simply click on a live cell. You can
          erase by dragging too!
        </Paragraph>
        <Paragraph>
          👁 If you want to <strong>pan the view</strong>, you can right- or
          middle-click anywhere on the grid, and drag in whichever direction you
          need.
        </Paragraph>
        <Paragraph>
          🆘 To see this help bubble again, simply click <strong>Help</strong>{' '}
          on the drawer at the bottom of the screen.
        </Paragraph>
        <Button onClick={onClose} className='w-full'>
          Got it!
        </Button>
      </div>
    </div>
  );
};

export default Tutorial;
