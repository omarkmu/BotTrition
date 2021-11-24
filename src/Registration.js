import React, { useEffect } from 'react';
import {
  Container, Flashes, Form, Input, Submit,
} from './Components';

export default function Registration(props) {
  const {
    csrfToken,
    flashes,
  } = props;

  useEffect(() => {
    document.title = 'Register – BotTrition';
  });

  return (
    <Container>
      <h1>Sign Up</h1>
      <Form token={csrfToken}>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          required
        />

        <Input
          type="password"
          id="password"
          placeholder="Password"
          required
        />

        <Submit id="submit" value="Login" />
      </Form>

      <br />

      <Flashes flashes={flashes} />

      Already have an account? Log in
      {' '}
      {/* TODO: replace this with a React Router Link */}
      <a href="/login">here</a>
      .
    </Container>
  );
}
