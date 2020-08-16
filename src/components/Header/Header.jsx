import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import { history } from "../../_helpers";
import { userActions } from "../../_actions";

import { useDispatch, useSelector } from "react-redux";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLock,
//   faIdCard,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.authentication.loggedIn);
  const dispatch = useDispatch();

  const handleLogout = (history) => () => {
    dispatch(userActions.logout());
    history.push("/");
  };

  // status boxes on the navigation panel
  const loginBox = (
    <span className="navbar-info">
      {/* Signed in as: <a href="/#">{user ? user.name : ""}</a> / */}
      <Nav.Link className="logout-nav-link" onClick={handleLogout(history)}>
        Logout
      </Nav.Link>
    </span>
  );
  const welcomeBox = (
    <span className="navbar-info">
      <a href="/login">Login&nbsp;</a>/<a href="/register">&nbsp;Register</a>
    </span>
  );

  // navigation panel menu items
  // const twittsMenuItem = <Nav.Link href="/users">Twitts</Nav.Link>;

  return (
    <div className="header d-flex">
      <Navbar
        // className="navbar-transparent header-navbar fixed-top"
        className="header-navbar fixed-top"
        color-on-scroll="300"
        bg="secondary"
        variant="dark"
        expand="lg"
      >
        <Navbar.Brand href="/">
          <Navbar.Text>
            <span className="logo-text">Twitter Clone App</span>
          </Navbar.Text>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {/* <Nav>{isLoggedIn ? twittsMenuItem : null}</Nav> */}
          {/* <Nav>{twittsMenuItem}</Nav> */}
          <Navbar.Text className="status-text">
            {isLoggedIn ? loginBox : welcomeBox}{" "}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
