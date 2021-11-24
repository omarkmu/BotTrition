import React from 'react';
import App from './App';
import Login from './Login';
import Profile from './Profile';
import Registration from './Registration';

export default function AppRouter() {
  // read information sent from flask
  const data = JSON.parse(document.getElementById('data').text);
  const flashes = JSON.parse(document.getElementById('flashes').text);
  const formErrors = JSON.parse(document.getElementById('formErrors').text);
  const csrfToken = document.getElementById('csrf_token').text;

  // temporary solution; should be replaced with React Router
  const path = window.location.pathname.slice(1); // remove the leading slash
  let Page;
  switch (path) {
    case 'app':
      Page = App;
      break;
    case 'login':
      Page = Login;
      break;
    case 'registration':
      Page = Registration;
      break;
    case 'profile':
      Page = Profile;
      break;
    default:
      throw new Error('unreachable');
  }

  return (
    <Page
      csrfToken={csrfToken}
      data={data}
      flashes={flashes}
      formErrors={formErrors}
    />
  );
}
