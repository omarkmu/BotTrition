import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './pages/Profile';

test('renders profile page input elements', () => {
  render(
    <MemoryRouter>
      <Profile data={{}} flashes={[]} />
    </MemoryRouter>,
  );

  expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
  expect(screen.getByLabelText('Height:')).toBeInTheDocument();
  expect(screen.getByLabelText('Height (inches):')).toBeInTheDocument();
  expect(screen.getByLabelText('Weight:')).toBeInTheDocument();
  expect(screen.getByLabelText('Birthdate:')).toBeInTheDocument();
  expect(screen.getByText('Save Information')).toBeInTheDocument();
});

test('negative weight value is invalid', () => {
  render(
    <MemoryRouter>
      <Profile data={{}} flashes={[]} />
    </MemoryRouter>,
  );

  const weightInput = screen.getByLabelText('Weight:');
  expect(weightInput).toBeInTheDocument();

  fireEvent.change(weightInput, { target: { value: -1 } });

  expect(weightInput).toHaveValue(-1);
  expect(weightInput.checkValidity()).toBe(false);

  fireEvent.change(weightInput, { target: { value: 1 } });

  expect(weightInput).toHaveValue(1);
  expect(weightInput.checkValidity()).toBe(true);
});

test('birthdate earlier than year 1900 is invalid', () => {
  render(
    <MemoryRouter>
      <Profile data={{}} flashes={[]} />
    </MemoryRouter>,
  );

  const birthdateInput = screen.getByLabelText('Birthdate:');
  expect(birthdateInput).toBeInTheDocument();

  fireEvent.change(birthdateInput, { target: { value: '1800-12-31' } });

  expect(birthdateInput).toHaveValue('1800-12-31');
  expect(birthdateInput.checkValidity()).toBe(false);

  fireEvent.change(birthdateInput, { target: { value: '1900-01-01' } });

  expect(birthdateInput).toHaveValue('1900-01-01');
  expect(birthdateInput.checkValidity()).toBe(true);
});

test('saved data is displayed', () => {
  const mockData = {
    gender: 'female',
    height: 72,
    weight: 200,
    birth_date: '1999-08-20',
  };

  render(
    <MemoryRouter>
      <Profile data={mockData} flashes={[]} />
    </MemoryRouter>,
  );

  const genderInput = screen.getByLabelText('Gender:');
  const feetSelect = screen.getByLabelText('Height:');
  const inchesSelect = screen.getByLabelText('Height (inches):');
  const weightInput = screen.getByLabelText('Weight:');
  const birthdateInput = screen.getByLabelText('Birthdate:');

  expect(genderInput).toBeInTheDocument();
  expect(feetSelect).toBeInTheDocument();
  expect(inchesSelect).toBeInTheDocument();
  expect(weightInput).toBeInTheDocument();
  expect(birthdateInput).toBeInTheDocument();

  expect(genderInput).toHaveValue('female');
  expect(feetSelect).toHaveValue('6');
  expect(inchesSelect).toHaveValue('12'); // value of 12 = 0 inches
  expect(weightInput).toHaveValue(200);
  expect(birthdateInput).toHaveValue('1999-08-20');
});
