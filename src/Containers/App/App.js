import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setModalWindowState, setToken, setUser } from "../../Store/actions";
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
import { bake_cookie, read_cookie } from "../../Cookies/Sfcookies";
import { getUserByID, refreshToken } from "../../APIController/APIController";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    let token = read_cookie("token");
    let userId = read_cookie("user_id");

    if (token.length !== 0) {
      this.props.setToken(token);
    } else {
      let promise = refreshToken();

      promise.then(result => {
        //Если есть ошибки
        if (typeof result.response !== "undefined") {
          switch (result.response.status) {
            case 404:
              return;
            default:
              return;
          }
        }

        this.props.setToken(result.token.value);
        this.props.setUser(result.user);

        //Unixtime в обычное время
        let tokenExp = new Date(result.token.exp * 1000);

        //Unixtime в обычное время
        let refreshTokenExp = new Date(result.refreshToken.exp * 1000);

        bake_cookie("token", result.token.value, tokenExp);
        bake_cookie("user_id", result.user.id, tokenExp);
        bake_cookie(
          "refresh_token",
          result.refreshToken.value,
          refreshTokenExp
        );
      });
    }

    if (userId.lenght !== 0) {
      let promise = getUserByID(userId);

      promise.then(user => {
        this.props.setUser(user);
      });
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
        {this.getModalWindowToShow()}
        <BroadCastMessage message="Веб-приложение находится в разработке" />
      </body>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalWindowState: modalWindowState => {
      dispatch(setModalWindowState(modalWindowState));
    },
    setToken: token => {
      dispatch(setToken(token));
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
