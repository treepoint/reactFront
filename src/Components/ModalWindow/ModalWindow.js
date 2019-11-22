import React from "react";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";
import "./modalWindow.css";

class ModalWindowBlur extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(false);
  }

  render() {
    return (
      <div className="blur" onClick={event => this.onClick(event)}>
        <div className="close" />
        <div className="modal">{this.props.windowToWrap}</div>
      </div>
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
)(ModalWindowBlur);
