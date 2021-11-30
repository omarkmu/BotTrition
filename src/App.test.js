import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './pages/App';

test('succsfully renders the submit button', () => {
  render(
    <MemoryRouter>
      <App data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const submitElement = screen.getByText('Submit');
  expect(submitElement).toBeInTheDocument();
});

test('selecting an option changes the paragraph text', () => {
  render(
    <MemoryRouter>
      <App data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const selectedText = screen.getByText('You selected');
  expect(selectedText).toBeInTheDocument();
});

test('food item is searched when button is clicked', () => {
  render(
    <MemoryRouter>
      <App data={{}} flashes={[]} />
    </MemoryRouter>,
  );
  const button = screen.getByText('Search');
  fireEvent.click(button);
  const input = screen.getByPlaceholderText('Search...');

  userEvent.type(input, 'chicken');
  expect(screen.getByPlaceholderText('Search...')).toHaveValue('chicken');
  userEvent.type(input);
});
