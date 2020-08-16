import React, { useEffect, useRef } from "react";
import { Form, Container, Row, Col, Image } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { twittActions } from "../../../_actions";

import Spinner from "../Spinner";

import "./TwittList.css";

const TwittList = (props) => {
  const { avatarImages } = props;
  const twitts = useSelector((state) => state.twitts);
  const loading = useSelector((state) => state.twitts.loading);

  const dispatch = useDispatch();

  const twittsListData = twitts.items ? twitts.items : [];

  const mounted = useRef();

  useEffect(() => {
    // only on componentDidMount event
    if (!mounted.current) {
      mounted.current = true;
      dispatch(twittActions.getAllTwitts());
    } else {
      // do componentDidUpate logic
    }
  }, [dispatch]);

  const switchValue = (value, index, item) => {
    let tempTwittListData = twittsListData;
    tempTwittListData[index] = {
      ...item,
      [value]: item[value] === 1 ? 0 : 1,
    };
    dispatch(twittActions.update(tempTwittListData[index]));
  };

  const listItems = twittsListData.map((item, index) => {
    const { ...itemData } = item;

    const currentUserAvatarImage = avatarImages.filter(
      (avatarImagesItem) =>
        avatarImagesItem.imageFileName === itemData.avatarImgFileName
    );

    return (
      <Container key={index} className="twittContainer">
        <Row>
          <Col xs={2} md={1}>
            <Image
              className="avatar-img"
              src={`${currentUserAvatarImage[0].imagePath}`}
              rounded
            />
          </Col>
          <Col md="2">
            <b>{itemData.name}</b>
          </Col>
          <Col md="4">{itemData.email}</Col>
          <Col md="5">
            <Form>
              <Form.Check custom type="switch">
                <Form.Check.Input
                  checked={itemData.isFollow}
                  onChange={() => {}}
                />
                <Form.Check.Label
                  onClick={() => switchValue("isFollow", index, itemData)}
                >
                  {itemData.isFollow ? `Follow  ` : "Unfollow"}
                </Form.Check.Label>
              </Form.Check>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md="12">{itemData.body}</Col>
        </Row>
        <Row></Row>
      </Container>
    );
  });

  if (loading) {
    return <Spinner />;
  }

  return <div className="twitt-list">{listItems}</div>;
};

export default TwittList;
