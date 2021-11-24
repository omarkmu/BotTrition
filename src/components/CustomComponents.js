import React from 'react';

export function Container(props) {
  const { children } = props;

  return (
    <div className="container">
      {children}
    </div>
  );
}

export function Flashes(props) {
  const { flashes } = props;

  if (flashes.length === 0) return null;

  return (
    <Row>
      <div className="flashes">
        {flashes.map((message) => <div className="alert-error">{message}</div>)}
      </div>
    </Row>
  );
}

export function Row(props) {
  const { marginFactor, children } = props;

  const style = marginFactor
    ? { '--margin-factor': marginFactor }
    : {};

  return (
    <span
      className="container-row"
      style={style}
    >
      {children}
    </span>
  );
}

export {
  Form, Input, Option, Select, Submit,
} from './HTMLComponents';
