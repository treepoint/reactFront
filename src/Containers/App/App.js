import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setModalWindowState } from "../../Store/actions";
import Header from "../Header/Header";
import BroadCastMessage from "../../Components/BroadCastMessage/BroadCastMessage";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import Registration from "../Forms/Registration";
import Login from "../Forms/Login";
import Profile from "../Forms/Profile";
import Home from "../Contents/Home";
import About from "../../Containers/Contents/About";
import { registration, login, profile } from "./MODAL_WINDOWS";

import "./app.css";

class App extends React.Component {
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
    modalWindowState: state.modalWindowState,
    modalWindowName: state.modalWindowName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalWindowState: modalWindowState => {
      dispatch(setModalWindowState(modalWindowState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
