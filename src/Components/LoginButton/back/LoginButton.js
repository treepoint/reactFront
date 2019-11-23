import React from "react";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../../Store/actions";
import userIcon from "../../Images/user_icon.png";
import "./LoginButton.css";

class LoginButton extends React.Component {
  getFullName() {
    let fullName =
      this.props.userName +
      " " +
      this.props.userSecondName +
      " " +
      this.props.userThirdName;

    switch ("") {
      case this.props.userName:
        return "";
      case this.props.userSecondName:
        return "";
      case this.props.userThirdName:
        return "";
      default:
        return fullName;
    }
  }

  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true);
  }

  render() {
    return (
      <div
        className="loginButton"
        onClick={event => this.onClick(event)}
        style={{
          background:
            "url(" + userIcon + ") no-repeat scroll 100% 0 transparent",
          backgroundSize: "20px 20px"
        }}
      >
        {!!this.getFullName() ? this.getFullName() : "Регистрация"}
      </div>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
