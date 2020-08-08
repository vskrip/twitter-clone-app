import React from "react";
import TwittList from "../../Widgets/TwittList";

import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import "./TwittsPage.css";

const TwittsPage = () => {
  // const onAddUser = () => {
  //   console.log('onAddUser event');
  //   window.location.href='/add-user';
  // };

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
                <Form>
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
                      placeholder="Text here..."
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
