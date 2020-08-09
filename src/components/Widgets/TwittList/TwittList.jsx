import React, { useEffect, useRef } from "react";
import { Form, Container, Row, Col, Image } from "react-bootstrap";

import avatarImage from "../../../assets/img/faces/user1-picture.png";
// import { useHistory } from "react-router";

// import ReactTooltip from "react-tooltip";

import { useDispatch, useSelector } from "react-redux";

import { twittActions } from "../../../_actions";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../Spinner";

import "./TwittList.css";

const TwittList = (props) => {
  const twitts = useSelector((state) => state.twitts);
  const loading = useSelector((state) => state.twitts.loading);
  // const [statusSwitcher, setStatusSwitcher] = useState(true);

  // const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();
  // const history = useHistory();

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

  // const handleModalClose = () => {
  //   setShow(false);
  // };

  // function createItem(item, password, requireLogin) {
  //   return {
  //     accountId: item.accountId,
  //     firstName: item.firstName,
  //     lastName: item.lastName,
  //     username: item.username,
  //     isAdmin: item.isAdmin,
  //     isClient: item.isClient,
  //     isUser: item.isUser,
  //     status: item.status,
  //     phone: item.phone,
  //     email: item.email,
  //     password: password,
  //     c_password: password, // from User list generated password without confirmation
  //     requireLogin: requireLogin,
  //   };
  // }

  // const saveModalDetails = (item, password, requireLogin) => {
  //   let tempUserListData = userListData;
  //   if (editMode) {
  //     // update user mode
  //     tempUserListData[requiredItem] = {
  //       ...item,
  //       password: password,
  //       requireLogin: requireLogin,
  //     };
  //     dispatch(userActions.update(item));
  //   } else {
  //     // create new account user mode
  //     const newItem = createItem(item, password, requireLogin);
  //     dispatch(userActions.register(newItem));
  //   }
  //   setShow(false);
  //   handleModalClose();
  // };

  // const deleteItem = (index) => {
  //   // console.log("index - ", index);
  //   // let tempUsers = userListData;
  //   // tempUsers.splice(index, 1);
  //   // setBrochure(tempBrochure);
  //   history.replace();
  // };

  // const switchValue = (value, index, item) => {
  //   let tempUserListData = userListData;
  //   tempUserListData[index] = {
  //     ...item,
  //     [value]: item[value] === 1 ? 0 : 1,
  //   };
  //   dispatch(userActions.update(tempUserListData[index]));
  // };

  // const moveClientToUser = (index, item) => {
  //   let tempUserListData = userListData;
  //   tempUserListData[index] = {
  //     ...item,
  //     isClient: 0,
  //     isUser: 1,
  //   };
  //   dispatch(userActions.moveClientToUser(tempUserListData[index]));
  // };

  // function addUserAccountButton() {
  //   return (
  //     <div className="user-list-add-user-link float-right">
  //       <button
  //         type="button"
  //         className="btn btn-outline-primary btn-sm user-list-action-btn"
  //         onClick={() => openModalFormInAddMode()}
  //       >
  //         <FontAwesomeIcon className="user-list-item-icon" icon={faPlus} />
  //         <span className="user-list-add-user-title">Add Account User</span>
  //       </button>
  //     </div>
  //   );
  // }

  // function addMoveClientToUserButton(index, itemData) {
  //   return (
  //     <div className="float-right">
  //       <button
  //         type="button"
  //         className="btn btn-outline-primary btn-sm user-list-action-btn"
  //         onClick={() => moveClientToUser(index, itemData)}
  //         data-tip
  //         data-for="moveClientToUserTip"
  //       >
  //         <FontAwesomeIcon className="user-list-item-icon" icon={faUserTie} />
  //       </button>

  //       <ReactTooltip id="moveClientToUserTip" place="top" effect="solid">
  //         Move to Users
  //       </ReactTooltip>
  //     </div>
  //   );
  // }

  // const emptyListAlert = <tr><td colSpan="10"><b>The list of users are empty!</b></td></tr>;

  // console.log("twittsListData - ", twittsListData);

  const listItems = twittsListData.map((item, index) => {
    const { ...itemData } = item;
    return (
      <Container key={index} className="twittContainer">
        <Row>
          <Col xs={2} md={1}>
            <Image
              className="avatarImg"
              // src={require("../../../assets/img/faces/user1-picture.png")}
              src={avatarImage}
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

  // let modalFormData = userListData[requiredItem];

  return (
    <div className="twitt-list">
      {/* Add Twitt Button */}
      {/* {addUserAccountButton()} */}
      {/* End Add Twitt Button */}
      {/* Twitt List Table */}
      {/* <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Body</th>
            <th>Email</th> */}
      {/* <th className="table-actions-header">Actions</th> */}
      {/* </tr>
        </thead>
        <tbody> */}
      {listItems}
      {/* { (userListData.length !==0) ? listItems : emptyListAlert } */}
      {/* </tbody>
      </Table> */}
      {/* End Twitt List Table */}
    </div>
  );
};

export default TwittList;
