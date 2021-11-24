import React, { useState } from 'react';

export function Input(props) {
  const {
    type, id, value, onChange, ...rest
  } = props;

  const [inputValue, setValue] = useState(value ?? '');
  const onChangeHandler = (e) => {
    onChange?.(e);
    setValue(e.target.value);
  };

  return (
    <input
      type={type}
      id={id}
      name={id}
      value={inputValue}
      onChange={onChangeHandler}
      {...rest}
    />
  );
}

export function DateInput(props) {
  const {
    onChange, required, ...rest
  } = props;

  const onChangeHandler = (e) => {
    onChange?.(e);
  };

  return (
    <Input
      type="date"
      onChange={onChangeHandler}
      required={required}
      {...rest}
    />
  );
}

export function NumberInput(props) {
  const {
    onChange, required, ...rest
  } = props;

  const onChangeHandler = (e) => {
    onChange?.(e);
  };

  return (
    <Input
      type="number"
      onChange={onChangeHandler}
      required={required}
      {...rest}
    />
  );
}
