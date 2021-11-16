/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useState } from 'react';
import { Dropdown, Option } from './Dropdown';

// This component will handle the diet lookup feature which will direct user to
// the best overall Diets.
export default function App() {
  const [optionValue, setOptionValue] = useState('');
  const handleSelect = (e) => {
    setOptionValue(e.target.value);
  };
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
        You selected
        {' '}
        {optionValue}
      </p>
    </div>
  );
}
