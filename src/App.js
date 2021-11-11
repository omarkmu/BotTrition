import './App.css';
import React from 'react';

function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  // const args = JSON.parse(document.getElementById("data").text);

  // This main page will be further designed with react components
  // so the user can interact with the main app page. Some Data will also
  // be present for viewing when user lands on this page.
  return (
    <h1> ! Welcome To Main App Page User !</h1>
  );
}

export default App;
