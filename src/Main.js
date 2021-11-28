import React from 'react';
import App from './pages/App';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Landing from './pages/Landing';

// reads information sent from flask and deletes the element containing it
function getData(key, json = true) {
  const el = document.getElementById(key);
  const content = el.text;

  el.remove();
  return json ? JSON.parse(content) : content;
}

const csrfToken = getData('csrf_token', false);
const data = getData('data');
const flashes = getData('flashes');
const form = getData('form_data');

export default function AppRouter() {
  // temporary solution; should be replaced with React Router
  const path = window.location.pathname.slice(1); // remove the leading slash
  let Page;
  switch (path) {
    case '':
      Page = Landing;
      break;
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
      form={form}
    />
  );
}
