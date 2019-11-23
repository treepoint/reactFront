import React from "react";
import { connect } from "react-redux";
import { setRegistrationWindowState } from "../../Store/actions";
import "./ModalWindow.css";

class ModalWindowBlur extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(false);
  }

  render() {
    return (
      <div className="modalWindowBlur" onClick={event => this.onClick(event)}>
        <div className="close" />
        {this.props.windowToWrap}
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
