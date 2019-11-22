import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";
import Header from "../Header/Header";
import Registration from "../Forms/Registration";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import Home from "../Contents/Home";
import About from "../../Containers/Contents/About";

import "./app.css";

class App extends React.Component {
  onClickHideRegistration(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.setRegistrationWindowState(false);
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
        {!!this.props.isRegistrationModalWindowActive ? (
          <ModalWindow
            contentToWrap={<Registration />}
            onClick={event => this.onClickHideRegistration(event)}
          />
        ) : (
          ""
        )}
      </body>
    );
  }
}

const mapStateToProps = state => {
  return {
    isRegistrationModalWindowActive: state.registrationWindowState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRegistrationWindowState: isRegistrationModalWindowActive => {
      dispatch(setRegistrationWindowState(isRegistrationModalWindowActive));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
