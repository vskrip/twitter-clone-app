import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../../../_helpers';
import { userActions } from '../../../../_actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './EditUserForm.css';

const EditUserForm = (props) => {
  const [show, setShow] = useState(true);
  const { id } = props.match.params;
  const user = useSelector(state => state.users.items);
  const [selectedUser, setSelectedUser] = useState({
    user_id: (id) ? id : null,
    account_id: (id) ? id : null, // TODO: hardcoded update with account_id
    user_first_name: '',
    user_last_name: '',
    username: '',
    phone: '',
    email: '',
    status: ''
  });
  const isLoading = useSelector(state => state.users.loading);
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const user = useRef(null);
  const dispatch = useDispatch();

  const getUserById = useCallback(() => {
    dispatch(userActions.getById(id));
  },[dispatch,id]);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedUser(selectedUser => ({ ...selectedUser, [name]: value }));
  }

  const handleClose = () => {
    setShow(false);
    history.goBack();
  };

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isValidForm = form.checkValidity();

    setValidated(true);

    if (isValidForm === false) {
      event.stopPropagation();
    } else {
      dispatch(userActions.update(selectedUser));
      // window.location.href=`/users`;
      // history.goBack();
    }

    setSubmitted(true);

    // history.push('/users');
  }

  return (
    <div className="edit-user-form">
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title><FontAwesomeIcon icon={faEdit} /> Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  name="user_id"
                  defaultValue={(user) ? user.id : ''} />
                <Form.Control
                  type="hidden"
                  name="account_id"
                  defaultValue={(user) ? user.accountId : ''} />
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>First Name  <span className="required-mark">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  defaultValue={(user) ? user.firstName : ''}
                  onChange={handleChange}
                  placeholder={(isLoading) ? "loading..." : "First Name" }
                  disabled={(isLoading) ? true : false }
                  required />
                  {submitted && !user.firstName && <div className="invalid-feedback">First Name is required</div>}
              </Form.Group>
              <Form.Group controlId="formEditUserLastName">
                <Form.Label>Last Name <span className="required-mark">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  defaultValue={(user && user.lastName) ? user.lastName : ''}
                  onChange={handleChange}
                  placeholder={(isLoading) ? "loading..." : "Last Name" }
                  disabled={(isLoading) ? true : false }
                  required />
                  {submitted && !user.lastName && <div className="invalid-feedback">Last Name is required</div>}
              </Form.Group>
              <Form.Group controlId="formEditUserUsername">
                <Form.Label>Username <span className="required-mark">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  defaultValue={(user) ? user.username : ''}
                  onChange={handleChange}
                  placeholder={(isLoading) ? "loading..." : "Username" } 
                  disabled={(isLoading) ? true : false }
                  required />
                  {submitted && !user.username && <div className="invalid-feedback">Username is required</div>}
              </Form.Group>
              <Form.Group controlId="formEditUserPhone">
                <Form.Label>Phone <span className="required-mark">*</span></Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone"
                  // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  defaultValue={(user) ? user.phone : ''}
                  onChange={handleChange}
                  placeholder={(isLoading) ? "loading..." : "Phone Number" }
                  disabled={(isLoading) ? true : false }
                  required />
                  {submitted && !user.phone && <div className="invalid-feedback">Phone number is required</div>}
              </Form.Group>
              <Form.Group controlId="formEditUserEmail">
                <Form.Label>Email <span className="required-mark">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={(user) ? user.email : ''}
                  onChange={handleChange}
                  placeholder={(isLoading) ? "loading..." : "Email" }
                  disabled={(isLoading) ? true : false }
                  required />
                  {submitted && !user.email && <div className="invalid-feedback">Email address is required</div>}
              </Form.Group>
              <Form.Group className="edit-user-role" controlId="formEditUserRole">
                <Form.Label>Role <span className="required-mark">*</span></Form.Label>
                <Form.Control 
                  as="select"
                  disabled={(isLoading) ? true : false }
                  required>
                  <option>Choose a role...</option>
                  <option>Editor</option>
                  <option>Stylist</option>
                </Form.Control>
                {/* {submitted && !user.phone && <div className="invalid-feedback">Phone number is required</div>} */}
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
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

export default EditUserForm;