import React, { useState } from 'react';
import { Dropdown, Option } from '../components/Dropdown';
import {
  AnchorButton, Row,
} from '../Components';

// This component will handle the diet lookup feature which will direct user to
// the best overall Diets.
export default function App() {
  const [optionValue, setOptionValue] = useState('');
  const [option, setOption] = useState('');
  const [value, setValue] = useState('');
  const [link, setLink] = useState();

  const handleStretches = (e) => {
    setOptionValue(e.target.value);
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    if (e.target.value === 'Biceps') {
      setLink('https://musclewiki.com/Stretches/Male/Biceps');
    }
    if (e.target.value === 'Chest') {
      setLink('https://musclewiki.com/Stretches/Male/Chest');
    }
    if (e.target.value === 'Abdominal') {
      setLink('https://musclewiki.com/Stretches/Male/Abdominals');
    }
    if (e.target.value === 'Quads') {
      setLink('https://musclewiki.com/Stretches/Male/Quads');
    }
    if (e.target.value === 'Calves') {
      setLink('https://musclewiki.com/Stretches/Male/Calves');
    }
  };
  const handleBodyweight = (e) => {
    setOption(e.target.value);
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    if (e.target.value === 'Biceps') {
      setLink('https://musclewiki.com/Bodyweight/Male/Biceps');
    }
    if (e.target.value === 'Chest') {
      setLink('https://musclewiki.com/Bodyweight/Male/Chest');
    }
    if (e.target.value === 'Abdominal') {
      setLink('https://musclewiki.com/Bodyweight/Male/Abdominals');
    }
    if (e.target.value === 'Quads') {
      setLink('https://musclewiki.com/Bodyweight/Male/Quads');
    }
    if (e.target.value === 'Calves') {
      setLink('https://musclewiki.com/Bodyweight/Male/Calves');
    }
  };
  const handleBarbells = (e) => {
    setValue(e.target.value);
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    if (e.target.value === 'Biceps') {
      setLink('https://musclewiki.com/Barbell/Male/Biceps');
    }
    if (e.target.value === 'Chest') {
      setLink('https://musclewiki.com/Barbell/Male/Chest');
    }
    if (e.target.value === 'Abdominal') {
      setLink('https://musclewiki.com/Barbell/Male/Abdominals');
    }
    if (e.target.value === 'Quads') {
      setLink('https://musclewiki.com/Barbell/Male/Quads');
    }
    if (e.target.value === 'Calves') {
      setLink('https://musclewiki.com/Barbell/Male/Calves');
    }
  };

  return (
    <div>
      <h1>Workout Finder</h1>
      <Row>
        <AnchorButton to="/profile" text="View Profile" />
        <AnchorButton to="/app" text="View Main Page" />
      </Row>
      <h2> Find The Best Workout</h2>
      <p>
        Decide and choose the best workout from choices such as
        stretches, bodyweight, or barbell exercises.
      </p>

      <h3>Stretches</h3>
      <Dropdown
        buttonText="Submit"
        onChange={handleStretches}
        action={link}
      >
        <Option value="Explore Stretch Workouts" />
        <Option value="Biceps" />
        <Option value="Chest" />
        <Option value="Quads" />
        <Option value="Calves" />
      </Dropdown>
      <p>
        {`You selected ${optionValue}`}
      </p>
      <h3>Bodyweight</h3>
      <Dropdown
        buttonText="Submit"
        onChange={handleBodyweight}
        action={link}
      >
        <Option value="Explore Bodyweight Workouts" />
        <Option value="Biceps" />
        <Option value="Chest" />
        <Option value="Quads" />
        <Option value="Calves" />
      </Dropdown>
      <p>
        {`You selected ${option}`}
      </p>
      <h3>Barbells</h3>
      <Dropdown
        buttonText="Submit"
        onChange={handleBarbells}
        action={link}
      >
        <Option value="Explore Bodyweight Workouts" />
        <Option value="Biceps" />
        <Option value="Chest" />
        <Option value="Quads" />
        <Option value="Calves" />
      </Dropdown>
      <p>
        {`You selected ${value}`}
      </p>
      <Row>
        <AnchorButton to="/login" text="Logout" />
      </Row>
    </div>
  );
}
