import React, { useState, useEffect, useRef } from 'react';

function trySubmit(form) {
  if (!form) return;
  if (form.checkValidity()) {
    // have to call it this way because the "submit" name overrides the method
    HTMLFormElement.prototype.submit.call(form);
  } else {
    form.reportValidity();
  }
}

export function AnchorButton(props) {
  const { href, text } = props;

  return (
    <button
      type="button"
      onClick={() => { window.location.href = href; }}
    >
      {text}
    </button>
  );
}

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

export function Input(props) {
  const {
    type,
    id,
    value,
    onChange,
    form,
    required,
    ...rest
  } = props;

  let initialValue = '';
  if (value) {
    initialValue = value;
  } else if ((form?.errors?.[id]?.length ?? 0) === 0) {
    // use the form data as the initial value if there were no errors
    initialValue = form.data[id];
  }

  const [inputValue, setValue] = useState(initialValue);
  const [validateRequired, setValidateRequired] = useState(type === 'date');

  // single-run useEffect to display form errors from flask
  const inputRef = useRef(null);
  useEffect(() => {
    if (!form) return;

    const err = form.errors[id]?.[0];
    if (!err) return;

    const el = inputRef.current;
    el.setCustomValidity(err);
    setTimeout(() => { // 0 delay setTimeout to fix race condition
      el.reportValidity();
      el.setCustomValidity('');
    });
  }, []);

  const onChangeHandler = (e) => {
    onChange?.(e);
    setValue(e.target.value);
    setValidateRequired(true);
  };

  const onKeyDownHandler = (e) => {
    // handle enter key
    if (e.keyCode !== 13) return;
    trySubmit(e.target.form);
  };

  return (
    <input
      type={type}
      id={id}
      name={id}
      value={inputValue}
      required={required && validateRequired}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      onBlur={() => setValidateRequired(true)}
      ref={inputRef}
      {...rest}
    />
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
    id, selected, values, labels, ...rest
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
      {...rest}
    >
      {options}
    </select>
  );
}

export function Submit(props) {
  const {
    id, value,
  } = props;

  // proper submit-typed inputs break validity display;
  // have to use button with click handler
  return (
    <button
      type="button"
      id={id}
      name={id}
      onClick={(e) => trySubmit(e.target.form)}
    >
      {value}
    </button>
  );
}
