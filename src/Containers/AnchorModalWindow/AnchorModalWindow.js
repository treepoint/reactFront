import React from "react";
import { connect } from "react-redux";
import { setModalWindowState, setModalWindowName } from "../../Store/actions";

class AnchorModalWindow extends React.Component {
  render() {
    return (
      <div
        onClick={event =>
          this.props.setModalWindow(event, true, this.props.modalWindowName)
        }
      >
        {this.props.value}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setModalWindow: (event, isActive, modalWindowName) => {
      event.stopPropagation();
      event.preventDefault();
      dispatch(setModalWindowState(isActive));
      dispatch(setModalWindowName(modalWindowName));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AnchorModalWindow);
