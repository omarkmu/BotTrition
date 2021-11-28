import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Flashes, Form, Input, Row, Submit,
} from '../Components';

export default function Registration(props) {
  const {
    csrfToken,
    flashes,
    form,
  } = props;

  useEffect(() => {
    document.title = 'Register – BotTrition';
  });

  return (
    <Container>
      <h1>Sign Up</h1>

      <Row>
        <Form token={csrfToken}>
          <Input
            form={form}
            type="text"
            id="username"
            placeholder="Username"
            minlength="4"
            maxlength="20"
            required
          />

          <Input
            form={form}
            type="password"
            id="password"
            placeholder="Password"
            minlength="4"
            maxlength="20"
            required
          />

          <Submit id="submit" value="Login" />
        </Form>
      </Row>

      <Flashes flashes={flashes} />

      <Row>
        Already have an account? Log in
        {' '}
        {/* TODO: replace this with a React Router Link */}
        <Link to="/login">here</Link>
        .
      </Row>
    </Container>
  );
}
