import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('food item is searched when button is clicked', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<App />);
  const button = screen.getByText('Search');
  fireEvent.click(button);
  const input = screen.getByPlaceholderText('Search...');

  userEvent.type(input, 'chicken');
  expect(screen.getByPlaceholderText('Search...')).toHaveValue('chicken');
  userEvent.type(input);
});
