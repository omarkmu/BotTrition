import React from 'react';
import {
  Form, Submit,
} from './Components/HTMLComponents';

export function Container(props) {
  const { children } = props;

  return (
    <div className="container">
      {children}
    </div>
  );
}

export function Flashes(props) {
  const {
    flashes,
  } = props;

  if (flashes.length === 0) return null;

  return (
    <div className="flashes">
      {flashes.map((message) => <div className="alert-error">{message}</div>)}
    </div>
  );
}

export function LinkButton(props) {
  const { href, value } = props;

  // uses a form to function as a link;
  // may be better to replace this with a styled anchor
  // which matches styled buttons
  return (
    <Form method="GET" action={href}>
      <Submit value={value} />
    </Form>
  );
}

export {
  Form, Input, Option, Select, Submit,
} from './Components/HTMLComponents';
