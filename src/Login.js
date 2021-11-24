import React, { useEffect } from 'react';
import {
  Container, Flashes, Form, Input, Submit,
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

      <br />

      <Flashes flashes={flashes} />

      Don&apos;t have an account? Register
      {' '}
      {/* TODO: replace this with a React Router Link */}
      <a href="/registration">here</a>
      .
    </Container>
  );
}
