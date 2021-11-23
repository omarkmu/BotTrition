import React from 'react';
import App from './App';
import Login from './Login';

export default function AppRouter() {
  const dataText = document.getElementById('data').text;

  // read information sent from flask
  const data = dataText && dataText.length > 0 ? JSON.parse(dataText) : {};
  const flashes = JSON.parse(document.getElementById('flashes').text);
  const csrfToken = document.getElementById('csrf_token').text;

  // temporary solution; should be replaced with React Router
  const path = window.location.pathname.slice(1); // remove the leading slash
  let Page;
  switch (path) {
    case 'index':
      Page = App;
      break;
    case 'login':
      Page = Login;
      break;
    default:
      throw new Error('unreachable');
  }

  return <Page csrfToken={csrfToken} data={data} flashes={flashes} />;
}
