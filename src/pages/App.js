import React, { useState } from 'react';
import { Container } from '../styles';
import {
  Form, Row, Select, Input,
} from '../Components';
import Header from '../components/Header';
import { FoodCard } from '../components/CustomComponents';

// This component will handle the diet lookup feature which will direct user to
// the best overall Diets.
export default function App() {
  const [food, setFoodValue] = useState('');
  const [foods, setFoodsValue] = useState([]);
  const set = new Set();
  const [link, setLink] = useState(null);

  const handleSelect = (e) => {
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
          setFoodsValue(json.foods);
        }
      });
  }

  const handleClick = () => {
    if (!link) return;
    window.location.href = link;
  };

  return (
    <>
      <Header />
      <Container>
        <h2> Find Out Best Overall Diets</h2>
        <Form
          onChange={handleSelect}
        >
          <Row>
            <Select
              useDefault
              defaultText="Click to see options"
              values={[
                'Mediterranean Diet',
                'DASH Diet',
                'The Flexitarian Diet',
                'Weight Watchers Diet',
                'Mayo Clinic Diet',
                'The MIND Diet',
              ]}
            />
          </Row>

          <Row>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Submit
            </button>
          </Row>
        </Form>

        <h2>Food Search</h2>
        <Input
          type="text"
          placeholder="Search..."
          value={food}
          onChange={handleChange}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Search
        </button>

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
      </Container>
    </>
  );
}
