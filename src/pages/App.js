import React, { useState } from 'react';
import { Container } from '../styles';
import { Dropdown, Option } from '../components/Dropdown';
import {
  AnchorButton, Row,
} from '../Components';
import Header from '../components/Header';
import { FoodCard } from '../components/CustomComponents';

// This component will handle the diet lookup feature which will direct user to
// the best overall Diets.
export default function App() {
  const [optionValue, setOptionValue] = useState('');
  const [food, setFoodValue] = useState('');
  const [foods, setFoodsValue] = useState([]);
  const set = new Set();
  const [link, setLink] = useState();

  const handleSelect = (e) => {
    setOptionValue(e.target.value);
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    if (e.target.value === 'Mediterranean Diet') {
      setLink('https://health.usnews.com/best-diet/mediterranean-diet');
    }
    if (e.target.value === 'DASH Diet') {
      setLink('https://health.usnews.com/best-diet/dash-diet');
    }
    if (e.target.value === 'The Flexitarian Diet') {
      setLink('https://health.usnews.com/best-diet/flexitarian-diet');
    }
    if (e.target.value === 'Weight Watchers Diet') {
      setLink('https://health.usnews.com/best-diet/weight-watchers-diet');
    }
    if (e.target.value === 'Mayo Clinic Diet') {
      setLink('https://health.usnews.com/best-diet/mayo-clinic-diet');
    }
    if (e.target.value === 'The MIND Diet') {
      setLink('https://health.usnews.com/best-diet/mind-diet');
    }
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
      <Header />
      <Container>
        <h2> Find Out Best Overall Diets</h2>
        <Dropdown
          buttonText="Submit"
          onChange={handleSelect}
          action={link}
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
        <label htmlFor="foodSearch">Search for food here:</label>
        <input
          type="text"
          placeholder="Search..."
          value={food}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Search</button>
        <ul className="items">
          {foods.slice(10, 30).map((elem) => {
            if (elem.description.toLowerCase() === food.toLowerCase()) {
              return null;// no need to show it in the page
            }
            if (!set.has(elem.description.toLowerCase())) {
              set.add(elem.description.toLowerCase());
              return (
                <FoodCard items={elem} />
              );
            }
            return null;
          })}
        </ul>
        <Row>
          <AnchorButton to="/login" text="Logout" />
        </Row>
      </Container>
    </div>
  );
}
