import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

const Button: FC<HTMLAttributes<HTMLButtonElement>> = (props) => (
  <button
    {...props}
    className={clsx(
      'border-2 rounded border-gray-500 p-2 bg-slate-300 text-gray-900 hover:text-white hover:bg-slate-900 transition-all',
      props.className,
    )}
  />
);

export default Button;
