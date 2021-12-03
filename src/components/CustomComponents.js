import React, { useState } from 'react';

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
    <div
      className="container-row"
      style={style}
    >
      {children}
    </div>
  );
}

export function FoodCard(props) {
  const [show, setShow] = useState(false);
  const { items } = props;
  return (
    <>
      <li className="foodDescription">{items.description}</li>
      <p className="title"> These are the nutrients that are present: </p>

      <div className="show hide">
        {
          show ? (
            <div className="listofNutration">
              {items.foodNutrients.map((element) => (
                <p className="nutration">
                  {element.nutrientName}
                  =
                  &nbsp;
                  {element.value}
                  {element.unitName}
                </p>
              ))}

            </div>
          ) : null
        }
        <button type="button" className="btn btn-secondary" onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      </div>

    </>
  );
}
