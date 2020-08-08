import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";

import { history } from "../../../../_helpers";
import { userActions, alertActions } from "../../../../_actions";

import "./LoginForm.css";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  function handleClose() {
    setShow(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isValidForm = form.checkValidity();

    if (isValidForm === false) {
      event.stopPropagation();
    } else {
      dispatch(userActions.login(email, password));
    }

    setValidated(true);
    setSubmitted(true);
  }

  return (
    <div className="login-form">
      <Modal show={show && !loggedIn} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alert.message && (
              <Alert variant={`alert ${alert.type}`}>{alert.message}</Alert>
            )}
            <Form.Group controlId="email">
              <Form.Label>
                Email <span className="required-mark">*</span>
              </Form.Label>
              <Form.Control
                className="control"
                name="email"
                type="email"
                value={email || ""}
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
              {submitted && !email && (
                <div className="invalid-feedback">Email is required</div>
              )}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                Password <span className="required-mark">*</span>
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password || ""}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              {submitted && !password && (
                <div className="invalid-feedback">Password is required</div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {loggingIn && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginForm;
