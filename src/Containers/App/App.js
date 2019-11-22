import React from "react";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";
import Header from "../Header/Header";
import Registration from "../Forms/Registration";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import HomePage from "../../Containers/Contents/HomePage";

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
        <HomePage />
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
