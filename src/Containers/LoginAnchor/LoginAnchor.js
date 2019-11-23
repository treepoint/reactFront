import React from "react";
import { connect } from "react-redux";
import { setLoginWindowState } from "../../Store/actions";

class LoginAnchor extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true);
  }

  render() {
    return <div onClick={event => this.onClick(event)}>Войти</div>;
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
)(LoginAnchor);
