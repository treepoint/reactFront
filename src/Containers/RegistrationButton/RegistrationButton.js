import React from "react";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";
import HeaderButton from "../../Components/HeaderButton/HeaderButton";

class RegistrationButton extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true);
  }

  render() {
    return (
      <HeaderButton
        value="Регистрация"
        onClick={event => this.onClick(event)}
      />
    );
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
)(RegistrationButton);
