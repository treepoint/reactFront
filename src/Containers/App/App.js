import React from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";
import Page from "../../Containers/Page/Page";

import "./app.css";

class App extends React.Component {
  render() {
    return (
      <body>
        <Header />
        <Page pageCode="home_page" />
        {!!this.props.isRegistrationModalWindowActive ? (
          <ModalWindow windowToWrap={<RegistrationForm />} />
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
