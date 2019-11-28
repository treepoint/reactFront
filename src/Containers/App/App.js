import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  setModalWindowState,
  setAuthToken,
  setUser
} from "../../Store/actions";
import Header from "../Header/Header";
import BroadCastMessage from "../../Components/BroadCastMessage/BroadCastMessage";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import Registration from "../Forms/Registration";
import Login from "../Forms/Login";
import Profile from "../Forms/Profile";
import Home from "../Contents/Home";
import About from "../Contents/About";
import Users from "../Contents/Users";
import { registration, login, profile } from "./MODAL_WINDOWS";
import { bake_cookie, read_cookie /*, delete_cookie */ } from "sfcookies";
import { getUserByID } from "../../APIController/APIController";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    let token = read_cookie("token");
    let userId = read_cookie("user_id");

    console.log(userId);

    if (token.length !== 0) {
      this.props.setAuthToken(token);
    }

    if (userId.lenght !== 0) {
      let promise = getUserByID(userId);

      promise.then(user => {
        this.props.setUser(user);
      });
    }
  }

  componentDidUpdate() {
    //Если появился токен — сделаем куку с ним
    if (this.props.authToken !== null) {
      bake_cookie("token", this.props.authToken);
    }

    if (this.props.user !== {}) {
      bake_cookie("user_id", this.props.user.id);
    }
  }

  hideModalWindow(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.setModalWindowState(false);
  }

  getModalWindowToShow() {
    //Если показывать ничего не нужно — выйдем сразу
    if (this.props.modalWindowState === false) {
      return;
    }

    if (this.props.modalWindowName === registration) {
      return (
        <ModalWindow
          contentToWrap={<Registration />}
          onClick={event => this.hideModalWindow(event)}
        />
      );
    }

    if (this.props.modalWindowName === login) {
      return (
        <ModalWindow
          contentToWrap={<Login />}
          onClick={event => this.hideModalWindow(event)}
        />
      );
    }

    if (this.props.modalWindowName === profile) {
      return (
        <ModalWindow
          contentToWrap={<Profile />}
          onClick={event => this.hideModalWindow(event)}
        />
      );
    }

    return;
  }

  render() {
    return (
      <body>
        <Header />
        <Router>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        {this.getModalWindowToShow()};
        <BroadCastMessage message="Веб-приложение находится в разработке" />
      </body>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    authToken: state.authToken,
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalWindowState: modalWindowState => {
      dispatch(setModalWindowState(modalWindowState));
    },
    setAuthToken: authToken => {
      dispatch(setAuthToken(authToken));
    },
    setUser: user => {
      dispatch(setUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
