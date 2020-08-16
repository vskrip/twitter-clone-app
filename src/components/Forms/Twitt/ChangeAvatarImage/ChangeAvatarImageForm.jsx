import React from "react";
import { Modal, Button, Image, Row, Col } from "react-bootstrap";

import "./ChangeAvatarImageForm.css";

const ChangeAvatarImageForm = (props) => {
  const {
    modalShow,
    modalFormData,
    handleModalClose,
    changeAvatarImage,
  } = props;

  const avatarImages =
    modalFormData && modalFormData.avatarImages
      ? modalFormData.avatarImages
      : [];

  const avatarImagesList = avatarImages.map((item, index) => {
    const { ...itemData } = item;
    return (
      <Col xs={2} md={1} key={index}>
        <Image
          className="avatar-img"
          src={itemData.imagePath}
          onClick={() =>
            changeAvatarImage(modalFormData.userId, itemData.imageFileName)
          }
          roundedCircle
        />
      </Col>
    );
  });

  return (
    <div className="add-user-form">
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Avatar Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>{avatarImagesList}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChangeAvatarImageForm;
