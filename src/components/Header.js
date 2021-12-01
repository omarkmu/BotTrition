import React from 'react';
import { Link } from 'react-router-dom';
import { AnchorButton } from './HTMLComponents';

function BotIcon(props) {
  const { full } = props;

  return (
    <div className="bot-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          fill="none"
          d="M0 0h24v24H0z"
        />
        <path
          fill="var(--icon-color, inherit)"
          d="M13 4.055c4.5.497 8 4.312 8 8.945v9H3v-9c0-4.633 3.5-8.448 8-8.945V1h2v3.055zM12 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        />
      </svg>
      {(full ? <span className="bot-icon-text">BotTrition</span> : null)}
    </div>
  );
}

export default function Header() {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <BotIcon full />
        </Link>
      </div>
      <div className="nav-right">
        <AnchorButton to="/login" text="Login" />
        <AnchorButton to="/registration" text="Register" />
      </div>
    </div>
  );
}
