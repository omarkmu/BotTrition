import React, { useEffect } from 'react';
import {
  Container, Flashes, Form, Input, Row, Submit,
} from './Components';

export default function Login(props) {
  const {
    csrfToken,
    flashes,
    formErrors,
  } = props;

  useEffect(() => {
    document.title = 'Login – BotTrition';
  });

  return (
    <Container>
      <h1>Log In</h1>

      <Row>
        <Form token={csrfToken}>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            errors={formErrors}
            required
          />

          <Input
            type="password"
            id="password"
            placeholder="Password"
            errors={formErrors}
            required
          />

          <Submit id="submit" value="Login" />
        </Form>
      </Row>

      <Flashes flashes={flashes} />

      <Row>
        Don&apos;t have an account? Register
        {' '}
        {/* TODO: replace this with a React Router Link */}
        <a href="/registration">here</a>
        .
      </Row>
    </Container>
  );
}
