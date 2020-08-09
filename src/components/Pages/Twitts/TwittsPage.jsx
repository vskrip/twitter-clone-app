import React, { useState } from "react";
import TwittList from "../../Widgets/TwittList";

import { useDispatch } from "react-redux";
import { twittActions } from "../../../_actions";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import "./TwittsPage.css";

const TwittsPage = () => {
  const [newTwitt, setNewTwitt] = useState({
    user_id: 2,
    name: "user2",
    email: "user2@gmail.com",
    body: "",
    isFollow: false,
  });
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setNewTwitt((newTwitt) => ({ ...newTwitt, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const isValidForm = form.checkValidity();

    setValidated(true);

    if (isValidForm === false) {
      event.stopPropagation();
    } else {
      dispatch(twittActions.create(newTwitt));
      window.location.reload(false);
    }
  }

  return (
    <div className="twitts-page">
      <Container>
        {/* Page Title */}
        <h2>
          <FontAwesomeIcon className="page-title-icon" icon={faUsers} />
          <span className="page-title">Twitts</span>
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
                    {/* <Form.Control
                      className="control"
                      name="firstName"
                      type="textarea"
                      // value={user.firstName}
                      placeholder="Right!"
                      // onChange={handleChange}
                      required
                    /> */}
                    <Form.Control
                      as="textarea"
                      rows="3"
                      name="body"
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
          <Col md="8">
            <Card>
              <Card.Header>Recent Tweets</Card.Header>
              <Card.Body>
                <TwittList />
              </Card.Body>
            </Card>{" "}
          </Col>
        </Row>
        {/* End Page Content */}
      </Container>
    </div>
  );
};

export default TwittsPage;
