import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { history } from "../../_helpers";
// import { PrivateRoute } from "../../_components";

import "./App.css";

import Header from "../Header";
import Footer from "../Footer";

import { LoginForm, RegisterForm } from "../Forms";

import { TwittsPage } from "../Pages";

const App = () => {
  return (
    <Router history={history}>
      <div className="stylist-app">
        <Header />
        <div className="wrapper">
          <Switch>
            <Route path="/" exact component={TwittsPage} />

            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />

            {/* <PrivateRoute path="/add-user" component={AddUserForm} />
            <PrivateRoute path="/edit-user/:id" component={EditUserForm} />
            <PrivateRoute path="/users/:id" component={EditUserForm} />
            <PrivateRoute
              path="/delete-user-confirm"
              component={DeleteUserConfirmForm}
            /> */}

            {/* <PrivateRoute path="/users" component={UsersPage} /> */}
            <Redirect from="*" to="/" />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
