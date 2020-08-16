import React, { useState } from "react";
import TwittList from "../../Widgets/TwittList";

import ChangeAvatarImageModalForm from "../../Forms/Twitt/ChangeAvatarImage";

import ReactTooltip from "react-tooltip";

import { useDispatch, useSelector } from "react-redux";
import { twittActions, userActions } from "../../../_actions";
import { history } from "../../../_helpers";

import avatarImagePath1 from "../../../assets/img/faces/avatar1-picture.png";
import avatarImagePath2 from "../../../assets/img/faces/avatar2-picture.png";
import avatarImagePath3 from "../../../assets/img/faces/avatar3-picture.png";
import avatarImagePath4 from "../../../assets/img/faces/avatar4-picture.png";
import avatarImagePath5 from "../../../assets/img/faces/avatar5-picture.png";
import avatarImagePath6 from "../../../assets/img/faces/avatar6-picture.png";
import avatarImagePath7 from "../../../assets/img/faces/default-picture.png";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import "./TwittsPage.css";

const TwittsPage = () => {
  const avatarImages = [
    {
      imagePath: avatarImagePath1,
      imageFileName: "avatar1-picture.png",
    },
    {
      imagePath: avatarImagePath2,
      imageFileName: "avatar2-picture.png",
    },
    {
      imagePath: avatarImagePath3,
      imageFileName: "avatar3-picture.png",
    },
    {
      imagePath: avatarImagePath4,
      imageFileName: "avatar4-picture.png",
    },
    {
      imagePath: avatarImagePath5,
      imageFileName: "avatar5-picture.png",
    },
    {
      imagePath: avatarImagePath6,
      imageFileName: "avatar6-picture.png",
    },
    {
      imagePath: avatarImagePath7,
      imageFileName: "default-picture.png",
    },
  ];

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  const twitts = useSelector((state) => state.twitts);
  const twittsListData = twitts.items ? twitts.items : [];

  const [newTwitt, setNewTwitt] = useState({
    user_id: user && user.id ? user.id : "",
    name: user && user.name ? user.name : "",
    email: user && user.email ? user.email : "",
    body: "",
    isFollow: false, // but default
    avatarImgFileName:
      user && user.avatarImgFileName
        ? user.avatarImgFileName
        : "default-picture.png",
  });

  const handleModalShow = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setNewTwitt((newTwitt) => ({ ...newTwitt, [name]: value }));
  }

  const changeAvatarImage = (userId, avatarImgFileName) => {
    let tempUser = user;
    tempUser = {
      ...user,
      avatarImgFileName: avatarImgFileName,
    };

    dispatch(userActions.update(tempUser));
    localStorage.setItem("user", JSON.stringify(tempUser));

    // TODO: update and remove hardcoding on the next version
    history.go("/twitts");

    setShow(false);
    handleModalClose();
  };

  const modalFormData = {
    userId: user && user.id ? user.id : "",
    avatarImages: avatarImages,
  };

  function openChangeAvatarImageModalForm() {
    setShow(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isValidForm = form.checkValidity();

    setValidated(true);

    const tempTwitts = twittsListData;

    if (isValidForm === false) {
      event.stopPropagation();
    } else {
      tempTwitts.push(newTwitt);
      dispatch(twittActions.create(newTwitt));
      window.location.reload(false);
    }
  }

  const currentUserAvatarImage = avatarImages.filter(
    (avatarImagesItem) =>
      avatarImagesItem.imageFileName === user.avatarImgFileName
  );

  return (
    <div className="twitts-page">
      <Container>
        {/* Page Title */}
        <h2>
          <FontAwesomeIcon className="page-title-icon" icon={faUsers} />
          <span className="page-title">Twitts</span>
          <span className="user-avatar">
            <Image
              className="avatar-img"
              src={`${currentUserAvatarImage[0].imagePath}`}
              onClick={() => openChangeAvatarImageModalForm()}
              data-tip
              data-for="changeAvatarImageTooltip"
              roundedCircle
            />
            <ReactTooltip
              id="changeAvatarImageTooltip"
              place="top"
              effect="solid"
            >
              Click for change avatar
            </ReactTooltip>{" "}
            <span className="user-title">
              {user && user.name ? user.name : ""}
            </span>
          </span>
        </h2>
        {/* End Page Title */}
        {/* Page Content */}
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>Tweet Something</Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group controlId="twitt">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="body"
                      defaultValue={newTwitt.body}
                      onChange={handleChange}
                      placeholder="Text here..."
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Post
                  </Button>
                </Form>
              </Card.Body>
            </Card>{" "}
          </Col>
          <Col md="8" className="recent-tweets-column">
            <Card>
              <Card.Header>Recent Tweets</Card.Header>
              <Card.Body className="twitts-list-card-body">
                <TwittList avatarImages={avatarImages} />
              </Card.Body>
            </Card>{" "}
          </Col>
        </Row>
        {/* End Page Content */}
      </Container>
      {/* Modal Form */}
      <ChangeAvatarImageModalForm
        modalShow={show}
        handleModalShow={handleModalShow}
        handleModalClose={handleModalClose}
        modalFormData={modalFormData}
        changeAvatarImage={changeAvatarImage}
      />
      {/* End Modal Form */}
    </div>
  );
};

export default TwittsPage;
