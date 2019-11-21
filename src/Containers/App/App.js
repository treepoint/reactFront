import React from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Registration from "../Registration/Registration";
import "./app.css";

class App extends React.Component {
  render() {
    return (
      <body>
        <Header />

        {!!this.props.isRegistrationModalWindowActive ? <Registration /> : ""}
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
