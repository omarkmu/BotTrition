import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function trySubmit(form) {
  if (!form) return;

  let isValid = form.checkValidity();
  if (isValid) {
    [...form.elements].forEach((el) => {
      // check for custom required field and invalidate if present
      if (el.getAttribute('data-required')) {
        // set the real required attribute
        el.setAttribute('required', '');
        isValid = false;
      }
    });
  }

  if (isValid) {
    // have to call it this way because the "submit" name overrides the method
    HTMLFormElement.prototype.submit.call(form);
  } else {
    form.reportValidity?.();
  }
}

export function AnchorButton(props) {
  const { href, to, text } = props;
  const navigate = useNavigate();

  if (href) {
    return (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => { window.location.href = href; }}
      >
        {text}
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => { navigate(to); }}
    >
      {text}
    </button>
  );
}

export function Form(props) {
  const {
    children, method, action, token, onChange,
  } = props;

  return (
    <form method={method ?? 'POST'} action={action} onChange={onChange}>
      {token ? <input type="hidden" name="csrf_token" value={token} /> : null}
      {children}
    </form>
  );
}

export function Input(props) {
  const {
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
    initialValue = form?.data?.[id] ?? '';
  }

  const [inputValue, setValue] = useState(initialValue);
  const [validateRequired, setValidateRequired] = useState(inputValue.toString().length > 0);

  // single-run useEffect to display form errors from flask
  const inputRef = useRef(null);
  useEffect(() => {
    const err = form?.errors?.[id]?.[0];
    if (!err) return;

    const el = inputRef.current;
    el.setCustomValidity(err);
    setTimeout(() => { // 0 delay setTimeout to fix race condition
      el.reportValidity?.();
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
      className="form-control"
      id={id}
      name={id}
      value={inputValue}
      required={required && validateRequired}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      onBlur={() => setValidateRequired(true)}
      ref={inputRef}
      {...(required && !validateRequired) ? { 'data-required': true } : {}}
      {...rest}
    />
  );
}

function Option(props) {
  const {
    text, value, selected, ...rest
  } = props;

  return (
    <option value={value} selected={selected} {...rest}>
      {text}
    </option>
  );
}

export function Select(props) {
  const {
    id, selected, values, labels, useDefault, defaultText, ...rest
  } = props;

  let hasSelected = false;
  const valueArr = values ?? [];
  const textArr = labels ?? [];
  const options = valueArr.map((value, idx) => {
    hasSelected ||= value === selected?.toString();

    return (
      <Option
        key={idx}
        value={value}
        text={textArr[idx] ?? value}
      />
    );
  });

  const defaultValue = useDefault === true ? '' : useDefault;
  if (!hasSelected && useDefault !== undefined) {
    options.unshift(
      <Option
        key={-1}
        value={defaultValue}
        text={defaultText ?? ''}
        disabled
      />,
    );
  }

  return (
    <select
      className="form-select"
      id={id}
      name={id}
      defaultValue={selected ?? defaultValue ?? valueArr?.[0]}
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
      className="btn btn-primary"
      type="button"
      id={id}
      name={id}
      onClick={(e) => trySubmit(e.target.form)}
    >
      {value}
    </button>
  );
}
