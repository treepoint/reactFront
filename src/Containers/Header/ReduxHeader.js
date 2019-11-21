import Header from "./Header";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";

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
    onClick: isRegistrationModalWindowActive => {
      dispatch(setRegistrationWindowState(isRegistrationModalWindowActive));
    }
  };
};

const ReduxHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default ReduxHeader;
