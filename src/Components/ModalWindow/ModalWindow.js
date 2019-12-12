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
        className="modalWindowBlur"
        onClick={event => this.props.hideModalWindow(event)}
      >
        <div className="modalWindowClose" />
        <div className="modalWindow">{this.props.contentToWrap}</div>
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
