import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Registration from './pages/Registration';

test('succesfully renders the registeration button', () => {
  render(
    <MemoryRouter>
      <Registration data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const registerElement = screen.getByText('Register');
  expect(registerElement).toBeInTheDocument();
});

test('Text fields are properly rendered', () => {
  render(
    <MemoryRouter>
      <Registration data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const username = screen.getByPlaceholderText('Username');
  const password = screen.getByPlaceholderText('Password');
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
