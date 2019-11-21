import Registration from "./Registration";
import { connect } from "react-redux";
import {
  setUserName,
  setUserSecondName,
  setUserThirdName,
  setRegistrationWindowState
} from "../../Store/actions";

const mapStateToProps = state => {
  return {
    userName: state.userName,
    userSecondName: state.userSecondName,
    userThirdName: state.userThirdName,
    isRegistrationModalWindowActive: state.registrationWindowState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (
      userName,
      userSecondName,
      userThirdName,
      isRegistrationModalWindowActive
    ) => {
      dispatch(setUserName(userName));
      dispatch(setUserSecondName(userSecondName));
      dispatch(setUserThirdName(userThirdName));
      dispatch(setRegistrationWindowState(isRegistrationModalWindowActive));
    }
  };
};

const ReduxRegistration = connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);

export default ReduxRegistration;
