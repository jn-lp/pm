import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';

export const Logout = ({ logout: plogout }) => (
  <button type="button" onClick={plogout}>
    Logout
  </button>
);

export default connect(
  null,
  { logout },
)(Logout);
