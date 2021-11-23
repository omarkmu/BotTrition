import React, { useEffect, useState } from 'react';
import Flashes from './Flashes';

export default function Login(props) {
  const {
    csrfToken,
    flashes,
  } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Login – BotTrition';
  });

  return (
    <>
      <div className="container">
        <h1>Log In</h1>
        <form method="post" action="" style={{ paddingBottom: '3px' }}>
          <input type="hidden" name="csrf_token" value={csrfToken} />

          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input id="submit" name="submit" type="submit" value="Login" />
        </form>
      </div>

      <Flashes flashes={flashes} />

      <div className="container">
        Don&apos;t have an account? Register
        {' '}
        {/* TODO: replace this with a React Router Link */}
        <a href="/registration">here</a>
        .
      </div>
    </>
  );
}
