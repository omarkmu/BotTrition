import React, { useEffect, useState } from 'react';
import Flashes from './Flashes';

export default function Profile(props) {
  // TODO: extract different parts into components
  // TODO: use defaults in gender & height selects
  // TODO: add frontend validation via setCustomValidity

  const {
    csrfToken,
    data,
    flashes,
  } = props;

  const [weight, setWeight] = useState(data.weight ?? '');
  const [birthdate, setBirthdate] = useState(data.birth_date ?? '');

  useEffect(() => {
    document.title = 'Profile – BotTrition';
  });

  return (
    <>
      <div className="container">
        <h1>Profile</h1>
        <a href="/index">
          <div className="container">
            <button type="button">View Main Page</button>
          </div>
        </a>
        <form method="post">
          <input type="hidden" name="csrf_token" value={csrfToken} />

          Gender:
          <select id="gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Non-Binary</option>
          </select>

          Height:
          <select id="height_feet" name="height_feet" required>
            <option value="4">4&apos;</option>
            <option value="5">5&apos;</option>
            <option value="6">6&apos;</option>
            <option value="7">7&apos;</option>
          </select>
          <select id="height_inches" name="height_inches" required>
            <option value="1">1&quot;</option>
            <option value="2">2&quot;</option>
            <option value="3">3&quot;</option>
            <option value="4">4&quot;</option>
            <option value="5">5&quot;</option>
            <option value="6">6&quot;</option>
            <option value="7">7&quot;</option>
            <option value="8">8&quot;</option>
            <option value="9">9&quot;</option>
            <option value="10">10&quot;</option>
            <option value="11">11&quot;</option>
          </select>

          <br />
          <br />

          Weight:
          <input
            id="weight"
            name="weight"
            placeholder="Weight (lbs)"
            step="any"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />

          Birthdate:
          <input
            id="birthdate"
            name="birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />

          <br />
          <br />

          <input id="submit" name="submit" type="submit" value="Save Information" />
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
