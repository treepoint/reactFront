import React from "react";
import { connect } from "react-redux";
import { setLoginWindowState } from "../../Store/actions";
import HeaderButton from "../../Components/HeaderButton/HeaderButton";

class LoginButton extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true);
  }

  render() {
    return (
      <HeaderButton value="Войти" onClick={event => this.onClick(event)} />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginModalWindowActive: state.loginWindowState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: isLoginModalWindowActive => {
      dispatch(setLoginWindowState(isLoginModalWindowActive));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
