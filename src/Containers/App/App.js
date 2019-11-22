import React from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Registration from "../Forms/Registration";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import HomePage from "../../Containers/Contents/HomePage";

import "./app.css";

class App extends React.Component {
  render() {
    return (
      <body>
        <Header />
        <HomePage />
        {!!this.props.isRegistrationModalWindowActive ? (
          <ModalWindow contentToWrap={<Registration />} />
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

export default connect(mapStateToProps)(App);
