import React from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import ModalWindowBlur from "../../Components/ModalWindowBlur/ModalWindowBlur";
import Page from "../../Containers/Page/Page";

import "./app.css";

class App extends React.Component {
  render() {
    return (
      <body>
        <Header />
        <Page pageCode="home page" />
        {!!this.props.isRegistrationModalWindowActive ? (
          <ModalWindowBlur windowToWrap={<RegistrationForm />} />
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
