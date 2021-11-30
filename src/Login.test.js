import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Login from './pages/Login';

test('succesfully renders the login page button', () => {
  render(
    <MemoryRouter>
      <Login data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const loginElement = screen.getByText('Login');
  expect(loginElement).toBeInTheDocument();
});

test('Text fields are properly rendered', () => {
  render(
    <MemoryRouter>
      <Login data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const username = screen.getByPlaceholderText('Username');
  const password = screen.getByPlaceholderText('Password');
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
