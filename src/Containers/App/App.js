import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  setRegistrationWindowState,
  setLoginWindowState
} from "../../Store/actions";
import Header from "../Header/Header";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import Registration from "../Forms/Registration";
import Login from "../Forms/Login";
import Home from "../Contents/Home";
import About from "../../Containers/Contents/About";

import "./app.css";

class App extends React.Component {
  hideModalWindow(event) {
    event.stopPropagation();
    event.preventDefault();

    switch (true) {
      case this.props.isRegistrationModalWindowActive:
        this.props.setRegistrationWindowState(false);
        break;
      case this.props.isLoginModalWindowActive:
        this.props.setLoginWindowState(false);
        break;
      default:
        break;
    }
  }

  getModalWindowToShow() {
    switch (true) {
      case this.props.isRegistrationModalWindowActive:
        return (
          <ModalWindow
            contentToWrap={<Registration />}
            onClick={event => this.hideModalWindow(event)}
          />
        );
      case this.props.isLoginModalWindowActive:
        return (
          <ModalWindow
            contentToWrap={<Login />}
            onClick={event => this.hideModalWindow(event)}
          />
        );
      default:
        return "";
    }
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
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        {this.getModalWindowToShow()};
      </body>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRegistrationModalWindowActive: state.registrationWindowState,
    isLoginModalWindowActive: state.loginWindowState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRegistrationWindowState: isRegistrationModalWindowActive => {
      dispatch(setRegistrationWindowState(isRegistrationModalWindowActive));
    },
    setLoginWindowState: isLoginModalWindowActive => {
      dispatch(setLoginWindowState(isLoginModalWindowActive));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
