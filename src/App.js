import React, { useState } from 'react';
import { Dropdown, Option } from './Dropdown';

// This component will handle the diet lookup feature which will direct user to
// the best overall Diets.
export default function App() {
  const [optionValue, setOptionValue] = useState('');
  const [food, setFoodValue] = useState('');
  const [foods, setFoodsValue] = useState([]);

  const handleSelect = (e) => {
    setOptionValue(e.target.value);
  };
  const handleChange = (e) => {
    setFoodValue(e.target.value);
  };

  function handleSubmit() {
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ food_input: food }),
    }).then((response) => response.json())

      .then((json) => {
        if ('error' in json) {
          // TODO: handle error checking here
        }
        if ('foods' in json) {
          // eslint-disable-next-line no-console
          console.log(json);
          setFoodsValue(json.foods);
        }
      });
  }

  return (
    <div>
      <h1> Find Out Best Overall Diets</h1>
      <Dropdown
        buttonText="Submit"
        onChange={handleSelect}
        action="https://health.usnews.com/best-diet/best-diets-overall"
      >
        <Option value="Click to see options" />
        <Option value="Mediterranean Diet" />
        <Option value="DASH Diet" />
        <Option value="The Flexitarian Diet" />
        <Option value="Weight Watchers Diet" />
        <Option value="Mayo Clinic Diet" />
        <Option value="The MIND Diet" />
      </Dropdown>
      <p>
        {`You selected ${optionValue}`}
      </p>
      <input
        type="text"
        placeholder="Search..."
        value={food}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>Search</button>
      <p>
        {foods.map((elem) => <li>{elem.description}</li>)}
      </p>
    </div>
  );
}
