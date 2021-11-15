/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-classes-per-file */
import React from 'react';
import { Dropdown, Option } from './Dropdown';

// This component will handle the diet lookup feature which will direct user to
// the best overall Diets.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
  }

  render() {
    return (
      <div>
        <h1> Find Out Best Overall Diets</h1>
        <Dropdown
          buttonText="Submit"
          onChange={this.handleSelect}
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
          {this.state.value}
          {' '}
        </p>
      </div>
    );
  }
}
// This component will handle the search function for the main app page. This search
// function will take a users input and use the USDA API to get data back from a certain
// food.
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null,
      peoples: [],
    };
  }

  componentDidMount() {
    this.serachPeople(this.state.query);
  }

  onChange(e) {
    this.setState({ query: e.target.value }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.serachPeople(this.state.query);
        }
      } else {
        this.serachPeople(this.state.query);
      }
    });
  }

  serachPeople(query) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&${query}`;

    if (query) {
      // if get value ion query so filter the data based on the query.
      fetch(url, {
        method: 'GET',
        headers: {
          apiKey,
        },
      }).then((results) => results.json()).then((data) => {
        const peoples = data.results.filter((people) => people.name === query).map((people) => (
          <ul key={people.name}>
            <li>{people.name}</li>
          </ul>
        ));
        this.setState({ peoples });
        console.log('state', peoples);
      });
    }
  }

  render() {
    return (
      <form>
        <p> Search For Your Favorite Foods Below </p>
        <input

          type="text"
          className="search-box"
          placeholder="Search for foods..."
          onChange={this.onChange.bind(this)}
        />
        {this.state.peoples}

      </form>

    );
  }
}

export default () => (
  <>
    <App />
    <Search />
  </>
);
