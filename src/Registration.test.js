import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Registration from './pages/Registration';

test('succesfully renders the registration button', () => {
  render(
    <MemoryRouter initialEntries={['/registration']}>
      <Registration data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const registerElement = screen.getByText('Register');
  expect(registerElement).toBeInTheDocument();
});

test('Text fields are properly rendered', () => {
  render(
    <MemoryRouter initialEntries={['/registration']}>
      <Registration data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const username = screen.getByPlaceholderText('Username');
  const password = screen.getByPlaceholderText('Password');
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
