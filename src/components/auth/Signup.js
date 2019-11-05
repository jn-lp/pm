import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

const Signup = (props) => {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const { error, isAuthenticated } = props;
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        setModal(!modal);
      }
    }
  }, [props, modal]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };

    // Attempt to register
    props.register(newUser);
  };

  return (
    <div>
      <NavLink onClick={() => setModal(!modal)} href="#">
          Signup
      </NavLink>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Signup</ModalHeader>
        <ModalBody>
          {msg ? (
            <Alert color="danger">{msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="mb-3"
                onChange={(e) => setUsername(e.target.value)}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                  Signup
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
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
