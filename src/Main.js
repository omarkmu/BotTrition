import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './pages/App';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Registration from './pages/Registration';

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
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="app" element={<App />} />
      <Route path="login" element={<Login csrfToken={csrfToken} flashes={flashes} form={form} />} />
      <Route path="registration" element={<Registration csrfToken={csrfToken} flashes={flashes} form={form} />} />
      <Route path="profile" element={<Profile csrfToken={csrfToken} data={data} flashes={flashes} form={form} />} />
    </Routes>
  );
}
