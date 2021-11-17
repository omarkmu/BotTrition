import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Succesfully renders the submit button', () => {
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
