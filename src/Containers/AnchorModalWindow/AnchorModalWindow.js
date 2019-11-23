import React from "react";
import { connect } from "react-redux";
import { setModalWindowState, setModalWindowName } from "../../Store/actions";

class AnchorModalWindow extends React.Component {
  onClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.onClick(true, this.props.modalWindowName);
  }

  render() {
    return <div onClick={event => this.onClick(event)}>{this.props.value}</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: (isActive, modalWindowName) => {
      dispatch(setModalWindowState(isActive));
      dispatch(setModalWindowName(modalWindowName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnchorModalWindow);
