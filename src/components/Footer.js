import React from 'react';

function Footer() {
  return (
    <footer>

      <nav className="navbar navbar-dark bg-dark fixed-bottom navbar-expand-xl">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://github.com/dhartman5">
            Drew Hartman
          </a>
          <a className="navbar-brand" href="https://github.com/souravdhar199">
            Sourav Dhar
          </a>
          <a className="navbar-brand" href="https://github.com/omarkmu/BotTrition/graphs/contributors">
            The Team
          </a>
          <a className="navbar-brand" href="https://github.com/omarkmu">
            Omar Muhammad
          </a>
          <a className="navbar-brand" href="https://github.com/BrandonDwyer">
            Brandon Dwyer
          </a>
        </div>
        {/* <a href="https://github.com/omarkmu/BotTrition/graphs/contributors" target="_blank" rel="noopener noreferrer" className="author">The BotTrition Team</a> */}
      </nav>
    </footer>
  );
}

export default Footer;
