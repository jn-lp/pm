import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

const Signup = ({ isAuthenticated, error, ...props }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };

    // Attempt to register
    props.register(newUser);
  };

  return isAuthenticated ? <Redirect to="/" /> : (
    <div className="Auth">
      {msg}
      <form className="auth-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ marginTop: '2rem' }}>
          Signup
        </button>
      </form>
      <Link className="secondary" to="/login">LogIn</Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  { register, clearErrors },
)(Signup);
