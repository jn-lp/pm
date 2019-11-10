import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Projects = ({ user }) => {
  const projects = user.projects || [
    { id: 1, name: 'pm' },
    { id: 2, name: 'test' },
    { id: 3, name: 'bot' },
  ];

  return projects.map(({ name, id }) => (
    <li key={id}>
      <Link to={`/dashboard/${id}`}>{name}</Link>
    </li>
  ));
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  null,
)(Projects);
