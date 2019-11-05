import React from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';

export const Logout = ({ logout: plogout }) => (
  <NavLink onClick={plogout} href="#">
    Logout
  </NavLink>
);

export default connect(
  null,
  { logout },
)(Logout);
