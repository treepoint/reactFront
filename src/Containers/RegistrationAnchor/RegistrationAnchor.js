import React from "react";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";

class RegistrationAnchor extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true);
  }

  render() {
    return <div onClick={event => this.onClick(event)}>Регистрация</div>;
  }
}

const mapStateToProps = state => {
  return {
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
)(RegistrationAnchor);
