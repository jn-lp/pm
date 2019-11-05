import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Logout from './auth/Logout';

const AppNavbar = ({ auth }) => {
  const [isOpen, setOpen] = useState(false);

  const { isAuthenticated, user } = auth;

  const authLinks = (
    <>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.username}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <Signup />
      </NavItem>
      <NavItem>
        <Login />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">pm.</NavbarBrand>
          <NavbarToggler onClick={() => setOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(AppNavbar);
