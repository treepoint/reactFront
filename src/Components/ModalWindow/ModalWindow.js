import React from "react";
//Подключаем CSS
import "./ModalWindow.css";

class ModalWindow extends React.Component {
  getHidden() {
    if (this.props.isHidden === true) {
      return " hidden";
    } else return "";
  }

  render() {
    return (
      <div
        className={"modalWindowBlur" + this.getHidden()}
        onClick={event => this.props.onClose(event)}
      >
        <div className={"modalWindowClose" + this.getHidden()} />
        <div className="modalWindow">{this.props.children}</div>
      </div>
    );
  }
}

export default ModalWindow;
