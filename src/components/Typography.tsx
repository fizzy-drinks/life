import { FC, HTMLAttributes } from 'react';

export const Heading: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h1 className='text-3xl font-bold mt-3 mb-4' {...props} />
);

export const Heading2: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => (
  <h2 className='text-2xl font-bold mt-2 mb-3' {...props} />
);

export const Paragraph: FC<HTMLAttributes<HTMLParagraphElement>> = (props) => (
  <p {...props} className='mb-3 mt-2' />
);
