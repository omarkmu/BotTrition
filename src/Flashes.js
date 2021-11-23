import React from 'react';

export default function Flashes(props) {
  const {
    flashes,
  } = props;

  return (
    <div className="container">
      {flashes.map((message) => <div className="alert-error">{message}</div>)}
    </div>
  );
}
