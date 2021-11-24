import React, { useEffect } from 'react';
import {
  AnchorButton, Container, Flashes, Form, Input, Row, Select, Submit,
} from '../Components';

export default function Profile(props) {
  const {
    csrfToken,
    data,
    flashes,
    form,
  } = props;

  useEffect(() => {
    document.title = 'Profile – BotTrition';
  });

  let heightFeet;
  let heightInches;

  if (data.height) {
    heightFeet = Math.floor(data.height / 12);
    heightInches = data.height % 12;
    if (heightInches === 0) heightInches = 12;
  }

  return (
    <Container>
      <h1>Profile</h1>

      <Row>
        <AnchorButton href="/app" text="View Main Page" />
      </Row>

      <Row>
        <Form token={csrfToken}>
          <Row marginFactor={2}>
            <label htmlFor="gender">Gender:</label>
            <Select
              id="gender"
              selected={data.gender}
              useDefault
              required
              values={['male', 'female', 'other']}
              labels={['Male', 'Female', 'Non-Binary']}
            />

            <label htmlFor="height_feet">Height:</label>
            <Select
              id="height_feet"
              useDefault
              required
              selected={heightFeet}
              values={['4', '5', '6', '7']}
              labels={['4\'', '5\'', '6\'', '7\'']}
            />

            <Select
              id="height_inches"
              useDefault
              required
              selected={heightInches}
              values={['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']}
              labels={['0"', '1"', '2"', '3"', '4"', '5"', '6"', '7"', '8"', '9"', '10"', '11"']}
            />
          </Row>

          <Row>
            <label htmlFor="weight">Weight:</label>
            <Input
              form={form}
              type="number"
              id="weight"
              placeholder="Weight (lbs)"
              value={data.weight}
              min="1"
              step="any"
              required
            />

            <label htmlFor="birthdate">Birthdate:</label>
            <Input
              form={form}
              type="date"
              id="birthdate"
              value={data.birth_date}
              min="1900-01-01"
              required
            />
          </Row>

          <Row>
            <Submit id="submit" value="Save Information" />
          </Row>
        </Form>
      </Row>

      <Flashes flashes={flashes} />
    </Container>
  );
}
