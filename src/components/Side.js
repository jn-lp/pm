import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Logout from '../pages/auth/Logout';

const ProtectedRoute = ({ user, project }) => (
  <div className="Side">
    <div>
      <img alt="avatar" src={`http://tinygraphs.com/spaceinvaders/${user.username}?bg=3F5C69&fg=F0F9F8&size=64&fmt=svg`} />
      {user.username}
    </div>
    <ul>
      <li>
        <NavLink exact to="/dashboard/">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to={`/dashboard/${project.id}`}>Project</NavLink>
      </li>
      <li>
        <NavLink to={`/dashboard/${project.id}/calendar`}>Calendar</NavLink>
      </li>
      <li>
        <NavLink to={`/dashboard/${project.id}/team`}>Team</NavLink>
      </li>
      <li>
        <NavLink to={`/dashboard/${project.id}/settings`}>Settings</NavLink>
      </li>
    </ul>
    <Logout />
  </div>
);

const mapStateToProps = (state) => ({
  user: state.auth.user,
  project: state.project,
});

export default connect(
  mapStateToProps,
  null,
)(ProtectedRoute);
