import React, { forwardRef, useEffect, useState } from 'react';

interface IInputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  className?: string;
  type?: string;
  value?: string | number;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      name = '',
      label = '',
      className = '',
      type = 'text',
      placeHolder = '',
      onChange,
      value,
      errorMessage,
      onBlur,
      onKeyDown,
    },
    ref
  ) => {
    const [hasValue, setHasValue] = useState(!!value);

    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    return (
      <div className="form-control">
        <div className="form-input">
          <input
            ref={ref}
            name={name}
            placeholder=""
            className={`input ${className}`}
            type={type}
            value={value}
            onChange={(e) => {
              if (onChange) onChange(e);
              setHasValue(!!e.target.value);
            }}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
          {label && <label className={`floating-label`}>{label}</label>}
          {errorMessage && <div className="form-msg">{errorMessage}</div>}
        </div>
      </div>
    );
  }
);
