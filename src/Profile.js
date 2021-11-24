import React, { useEffect } from 'react';
import {
  Container, Flashes, Form, LinkButton, Input, Select, Submit,
} from './Components';

export default function Profile(props) {
  // TODO: add frontend validation via setCustomValidity

  const {
    csrfToken,
    data,
    flashes,
    formErrors,
  } = props;

  useEffect(() => {
    document.title = 'Profile – BotTrition';
  });

  let heightFeet;
  let heightInches;

  if (data.height) {
    heightFeet = Math.floor(data.height / 12);
    heightInches = data.height % 12;
  }

  return (
    <Container>
      <h1>Profile</h1>

      <LinkButton href="/app" value="View Main Page" />

      <br />

      <Form token={csrfToken}>
        Gender:
        <Select
          id="gender"
          selected={data.gender}
          required
          values={['male', 'female', 'other']}
          labels={['Male', 'Female', 'Non-Binary']}
        />

        Height:
        <Select
          id="height_feet"
          selected={heightFeet}
          values={['4', '5', '6', '7']}
          labels={['4\'', '5\'', '6\'', '7\'']}
        />

        <Select
          id="height_inches"
          selected={heightInches}
          values={['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']}
          labels={['0"', '1"', '2"', '3"', '4"', '5"', '6"', '7"', '8"', '9"', '10"', '11"']}
        />

        <br />
        <br />

        Weight:
        <Input
          type="number"
          id="weight"
          placeholder="Weight (lbs)"
          value={data.weight}
          errors={formErrors}
          min="1"
          step="any"
          required
        />

        Birthdate:
        <Input
          type="date"
          id="birthdate"
          value={data.birth_date}
          errors={formErrors}
          min="1900-01-01"
          required
        />

        <br />
        <br />

        <Submit id="submit" value="Save Information" />
      </Form>

      <Flashes flashes={flashes} />

      Don&apos;t have an account? Register
      {' '}
      {/* TODO: replace this with a React Router Link */}
      <a href="/registration">here</a>
      .
    </Container>
  );
}
