import React, { useEffect, useState } from 'react';
import Flashes from './Flashes';

export default function Registration(props) {
  const {
    csrfToken,
    flashes,
  } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Register – BotTrition';
  });

  return (
    <>
      <div className="container">
        <h1>Sign Up</h1>
        <form method="post">
          <input type="hidden" name="csrf_token" value={csrfToken} />

          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input id="submit" name="submit" type="submit" value="Login" />
        </form>
      </div>

      <Flashes flashes={flashes} />

      <div className="container">
        Already have an account? Log in
        {' '}
        {/* TODO: replace this with a React Router Link */}
        <a href="/login">here</a>
        .
      </div>
    </>
  );
}
