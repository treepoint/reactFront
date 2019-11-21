import App from "./App";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isRegistrationModalWindowActive: state.registrationWindowState
  };
};

const ReduxApp = connect(mapStateToProps)(App);

export default ReduxApp;
