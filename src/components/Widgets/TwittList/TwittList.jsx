import React, { useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
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

  let num = 0;

  // const emptyListAlert = <tr><td colSpan="10"><b>The list of users are empty!</b></td></tr>;

  console.log("twitts - ", twitts);

  const listItems = twittsListData.map((item, index) => {
    const { ...itemData } = item;
    return (
      <tr key={index}>
        <td>{itemData.id}</td>
        <td>{itemData.userId}</td>
        <td>{itemData.body}</td>
        <td>{itemData.email}</td>
        {/* <td>
          <button
            type="button"
            className="btn btn-outline-success btn-sm user-list-action-btn"
            // onClick={() => replaceModalItem(index)}
            data-tip
            data-for="editDetailsTip"
          >
            <FontAwesomeIcon className="user-list-item-icon" icon={faEdit} />
          </button>

          <ReactTooltip id="editDetailsTip" place="top" effect="solid">
            Edit Details
          </ReactTooltip>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm user-list-action-btn"
            onClick={() => deleteItem(index)}
            data-tip
            data-for="deleteTip"
          >
            <FontAwesomeIcon
              className="user-list-item-icon"
              icon={faTrashAlt}
            />
          </button>

          <ReactTooltip id="deleteTip" place="top" effect="solid">
            Delete
          </ReactTooltip>
        </td> */}
      </tr>
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
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Body</th>
            <th>Email</th>
            {/* <th className="table-actions-header">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {listItems}
          {/* { (userListData.length !==0) ? listItems : emptyListAlert } */}
        </tbody>
      </Table>
      {/* End Twitt List Table */}
    </div>
  );
};

export default TwittList;
