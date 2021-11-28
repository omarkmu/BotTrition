import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Flashes, Form, Input, Row, Submit,
} from '../Components';

export default function Login(props) {
  const {
    csrfToken,
    flashes,
    form,
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
            form={form}
            type="text"
            id="username"
            placeholder="Username"
            required
          />

          <Input
            form={form}
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <Submit id="submit" value="Login" />
        </Form>
      </Row>

      <Flashes flashes={flashes} />

      <Row>
        Don&apos;t have an account? Register
        {' '}
        <Link to="/registration">here</Link>
        .
      </Row>
    </Container>
  );
}
