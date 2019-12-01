import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setModalWindowState } from "../../Store/actions";
//Подключаем CSS
import "./ModalWindow.css";

class ModalWindow extends React.Component {
  render() {
    return (
      <div
        className="blur"
        onClick={event => this.props.hideModalWindow(event)}
      >
        <div className="close" />
        <div className="modal">{this.props.contentToWrap}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideModalWindow: event => {
      event.stopPropagation();
      event.preventDefault();
      dispatch(setModalWindowState(false));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ModalWindow);
