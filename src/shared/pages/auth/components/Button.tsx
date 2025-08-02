import type React from 'react';

export interface IButtonProps {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit';
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
  className = '',
  isDisabled = false,
  isLoading = false,
  type = 'submit',
  label = '',
  onClick,
  children,
}) => {
  return (
    <button
      className="btn btn-primary"
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? <span className='spinner'></span> : label || children}
    </button>
  );
};
