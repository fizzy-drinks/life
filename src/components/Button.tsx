import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

const Button: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className={clsx('border-2 rounded border-gray-500 p-2', props.className)}
  />
);

export default Button;
