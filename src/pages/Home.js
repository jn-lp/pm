import React from 'react';
import { Link } from 'react-router-dom';

const Landing = ({ isAuthenticated }) => (
  <div className="Landing">
    <div className="landing-blob">
      pm.
    </div>
    <div className="landing-half">
      <Link to="/login/" className="landing-button">Login</Link>
      {isAuthenticated || <Link to="/signup/" className="landing-button">Create Account</Link>}
    </div>
  </div>
);

export default Landing;
