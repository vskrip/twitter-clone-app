import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './AddUserForm.css';

const AddUserForm = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="add-user-form">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon icon={faPlus} /> Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAddUserFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group controlId="formAddUserLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group controlId="formAddUserUsername">
              <Form.Label>Userame</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="formAddUserPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="tel" 
                name="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="Phone Number"
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email Address" />
            </Form.Group>
            <Form.Group className="add-user-role" controlId="formAddUserRole">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select">
                <option>Choose a role...</option>
                <option>Editor</option>
                <option>Stylist</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add User
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddUserForm;