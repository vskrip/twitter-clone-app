import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../../../_actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import "./RegisterForm.css";

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const handleClose = () => setShow(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isValidForm = form.checkValidity();

    if (isValidForm === false) {
      event.stopPropagation();
    } else {
      if (user.name && user.email && user.password && user.c_password) {
        dispatch(userActions.register(user));
      }
    }

    setValidated(true);
    setSubmitted(true);
  }

  return (
    <div className="register-form">
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FontAwesomeIcon icon={faUserPlus} /> Register
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="userName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="control"
                name="name"
                type="text"
                value={user.name}
                placeholder="Username"
                onChange={handleChange}
                required
              />
              {submitted && !user.name && (
                <div className="invalid-feedback">Username is required</div>
              )}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="control"
                name="email"
                type="email"
                value={user.email}
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
              {submitted && !user.email && (
                <div className="invalid-feedback">Email is required</div>
              )}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="control"
                name="password"
                type="password"
                value={user.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
              {submitted && !user.password && (
                <div className="invalid-feedback">Password is required!</div>
              )}
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="control"
                name="c_password"
                type="password"
                value={user.c_password}
                placeholder="Confirm Password"
                onChange={handleChange}
                required
              />
              {submitted && !user.c_password && (
                <div className="invalid-feedback">
                  Confirm password is required!
                </div>
              )}
              <div className="register-form-notice">
                * Password should contain at least 8 characters!
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              {registering && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Register
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

export default RegisterForm;
