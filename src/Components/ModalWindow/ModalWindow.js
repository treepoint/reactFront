import React from "react";
//Подключаем CSS
import "./ModalWindow.css";

class ModalWindow extends React.PureComponent {
  getHidden() {
    if (this.props.isHidden === true) {
      return " hidden";
    } else return "";
  }

  render() {
    return (
      <div
        className={"modalWindowBlur" + this.getHidden()}
        onMouseDown={event => this.props.onClose(event)}
      >
        <div
          className="modalWindow"
          onMouseDown={event => event.stopPropagation()}
        >
          <div
            className={"modalWindowClose" + this.getHidden()}
            onMouseDown={event => this.props.onClose(event)}
          />
          <div className="modalWindowChildren">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default ModalWindow;
