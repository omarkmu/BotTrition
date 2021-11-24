import React from 'react';

export function Form(props) {
  const {
    children, method, action, token,
  } = props;

  return (
    <form method={method ?? 'POST'} action={action}>
      {token ? <input type="hidden" name="csrf_token" value={token} /> : null}
      {children}
    </form>
  );
}

export function Option(props) {
  const {
    text, value, selected,
  } = props;

  return (
    <option value={value} selected={selected}>
      {text}
    </option>
  );
}

export function Select(props) {
  const {
    children, id, selected, values, labels, required, onChange, ...rest
  } = props;

  const valueArr = values ?? [];
  const textArr = labels ?? [];
  const options = valueArr.map((value, idx) => (
    <Option
      selected={value === selected?.toString?.()}
      value={value}
      text={textArr[idx] ?? value}
    />
  ));

  return (
    <select
      id={id}
      name={id}
      required={required ?? false}
      onChange={onChange}
      {...rest}
    >
      {options}
      {children}
    </select>
  );
}

export function Submit(props) {
  const {
    id, value,
  } = props;

  return (
    <input
      type="submit"
      id={id}
      name={id}
      value={value}
    />
  );
}
