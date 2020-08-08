import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./UserModalForm.css";

const UserModalForm = (props) => {
  const { modalShow, editMode, handleModalClose, saveModalDetails } = props;
  const [user, setUser] = useState({
    id: null,
    contactId: null,
    accountId: null,
    firstName: "",
    lastName: "",
    username: "",
    status: "",
    isAdmin: 0,
    isClient: 0,
    isUser: 0,
    phone: "",
    email: "",
  });
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // TODO: relocage this state into user object
  const [password, setPassword] = useState("");
  const [requireLogin, setRequireLogin] = useState(false);

  useEffect(() => {
    setUser({
      id: props.modalFormData.id ? props.modalFormData.id : null,
      contactId: props.modalFormData.contactId
        ? props.modalFormData.contactId
        : null,
      accountId: props.modalFormData.accountId
        ? props.modalFormData.accountId
        : null,
      firstName: props.modalFormData.firstName
        ? props.modalFormData.firstName
        : "",
      lastName: props.modalFormData.lastName
        ? props.modalFormData.lastName
        : "",
      username: props.modalFormData.username
        ? props.modalFormData.username
        : "",
      phone: props.modalFormData.phone ? props.modalFormData.phone : "",
      email: props.modalFormData.email ? props.modalFormData.email : "",
      status: props.modalFormData.status ? props.modalFormData.status : "",
      isAdmin: props.modalFormData.isAdmin ? props.modalFormData.isAdmin : 0,
      isClient: props.modalFormData.isClient ? props.modalFormData.isClient : 0,
      isUser: props.modalFormData.isUser ? props.modalFormData.isUser : 0,
    });
  }, [props.modalFormData]); // empty-array means don't watch for any updates

  // console.log('props.modalFormData - ', props.modalFormData);
  // console.log('user - ', user);

  // processing user object with new entered data
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  const handleModalCloseFn = () => {
    setPassword("");
    handleModalClose();
  };

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isValidForm = form.checkValidity();

    if (isValidForm === false) {
      event.stopPropagation();
    } else {
      saveModalDetails(user, password, requireLogin);
    }

    setValidated(true);
    setSubmitted(true);
  }

  function generatePassword() {
    setPassword(Math.floor(Math.random() * 99999 + 1000));
    setRequireLogin(true);
  }

  function switchRequireLoginCheckbox() {
    setRequireLogin(!requireLogin);
  }

  const editModeTitle = (
    <Modal.Title>
      <FontAwesomeIcon icon={faEdit} /> Edit Account User
    </Modal.Title>
  );
  const addModeTitle = (
    <Modal.Title>
      <FontAwesomeIcon icon={faPlus} /> Add Account User
    </Modal.Title>
  );
  const editModeActionButtonTitle = "Save Changes";
  const addModeActionButtonTitle = "Add User";

  return (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          {editMode ? editModeTitle : addModeTitle}
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="hidden"
              name="id"
              defaultValue={props.modalFormData ? props.modalFormData.id : ""}
            />
            <Form.Control
              type="hidden"
              name="contactId"
              defaultValue={
                props.modalFormData ? props.modalFormData.contactId : ""
              }
            />
            <Form.Control
              type="hidden"
              name="accountId"
              defaultValue={
                props.modalFormData ? props.modalFormData.accountId : ""
              }
            />
          </Form.Group>
          <Form.Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>
                  First Name <span className="required-mark">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  defaultValue={
                    props.modalFormData ? props.modalFormData.firstName : ""
                  }
                  onChange={handleChange}
                  placeholder={"First Name"}
                  required
                />
                {submitted && !props.modalFormData.firstName && (
                  <div className="invalid-feedback">First Name is required</div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>
                  Last Name <span className="required-mark">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  defaultValue={
                    props.modalFormData.lastName
                      ? props.modalFormData.lastName
                      : ""
                  }
                  onChange={handleChange}
                  placeholder={"Last Name"}
                  required
                />
                {submitted && !props.modalFormData.lastName && (
                  <div className="invalid-feedback">Last Name is required</div>
                )}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="username">
                <Form.Label>
                  Username <span className="required-mark">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  defaultValue={
                    props.modalFormData.username
                      ? props.modalFormData.username
                      : ""
                  }
                  onChange={handleChange}
                  placeholder={"Username"}
                  required
                />
                {submitted && !props.modalFormData.username && (
                  <div className="invalid-feedback">Username is required</div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="edit-user-role"
                controlId="formEditUserRole"
              >
                <Form.Label>
                  Role <span className="required-mark">*</span>
                </Form.Label>
                <Form.Control name="role" as="select" required>
                  <option>Choose a role...</option>
                  <option>Editor</option>
                  <option>Stylist</option>
                </Form.Control>
                {submitted && !props.modalFormData.role && (
                  <div className="invalid-feedback">Role is required</div>
                )}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="email">
                <Form.Label>
                  Email <span className="required-mark">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  defaultValue={
                    props.modalFormData.email ? props.modalFormData.email : ""
                  }
                  onChange={handleChange}
                  placeholder={"Email address"}
                  required
                />
                {submitted && !props.modalFormData.email && (
                  <div className="invalid-feedback">
                    Email address is required
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phone">
                <Form.Label>
                  Phone <span className="required-mark">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  defaultValue={
                    props.modalFormData.phone ? props.modalFormData.phone : ""
                  }
                  onChange={handleChange}
                  placeholder={"Phone Number"}
                  required
                />
                {submitted && !props.modalFormData.phone && (
                  <div className="invalid-feedback">
                    Phone number is required
                  </div>
                )}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Temporary Password</Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  defaultValue={password ? password : ""}
                  // onChange={handleChange}
                  placeholder={"Temporary Password"}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                className="generatePasswordButton"
                variant="outline-primary"
                onClick={generatePassword}
              >
                Generate Password
              </Button>
            </Col>
          </Form.Row>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Require to change the password on the next login."
              onChange={switchRequireLoginCheckbox}
              checked={requireLogin}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleModalCloseFn}>
            Close
          </Button>
          <Button type="submit" variant="outline-primary">
            {editMode ? editModeActionButtonTitle : addModeActionButtonTitle}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserModalForm;
