import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './pages/App';
import Login from './pages/Login';
import Registration from './pages/Registration';

test('succesfully renders the submit button', () => {
  render(<App />);
  const submitElement = screen.getByText('Submit');
  expect(submitElement).toBeInTheDocument();
});

test('selecting an option changes the paragraph text', () => {
  const app = render(<App />);
  const selectElement = app.container.querySelector('select#services');
  expect(selectElement).toBeInTheDocument();

  const option = screen.getByText('Mediterranean Diet');
  expect(option).toBeInTheDocument();

  fireEvent.change(selectElement, { target: { value: 'Mediterranean Diet' } });

  const selectedText = screen.getByText('You selected Mediterranean Diet');
  expect(selectedText).toBeInTheDocument();
});

test('food item is searched when button is clicked', () => {
  render(<App />);
  const button = screen.getByText('Search');
  fireEvent.click(button);
  const input = screen.getByPlaceholderText('Search...');

  userEvent.type(input, 'chicken');
  expect(screen.getByPlaceholderText('Search...')).toHaveValue('chicken');
  userEvent.type(input);
});

test('succesfully renders the login page button', () => {
  render(<Login />);
  const loginElement = screen.getByText('Login');
  fireEvent.click(loginElement);
});

test('pass invalid password registration value to get error message', () => {
  render(<Registration />);
  const registerButton = screen.getByText('Register');
  const username = screen.getByPlaceholderText('Username');
  const password = screen.getByPlaceholderText('Password');

  userEvent.type(username, 'Dragovich');
  expect(screen.getByPlaceholderText('Username')).toHaveValue('Dragovich');
  userEvent.type(password, '1');
  expect(screen.getByPlaceholderText('Password')).toHaveValue('1');
  expect(screen.queryByTestId('error-msg')).toBeInTheDocument();
  expect(screen.queryByTestId('error-msg').textContent).toEqual('Use at least 4 characters');

  fireEvent.click(registerButton);
});

test('pass valid registeration values in text fields to register', () => {
  render(<Registration />);
  const registerButton = screen.getByText('Register');
  const username = screen.getByPlaceholderText('Username');
  const password = screen.getByPlaceholderText('Password');

  userEvent.type(username, 'Dragovich');
  expect(screen.getByPlaceholderText('Username')).toHaveValue('Dragovich');

  userEvent.type(password, '1234');
  expect(screen.getByPlaceholderText('Password')).toHaveValue('1234');
  fireEvent.click(registerButton);
});
