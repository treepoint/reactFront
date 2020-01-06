import React from "react";
import Button from "../Button/Button";
import ModalWindow from "../ModalWindow/ModalWindow";
import "./ConfirmModalWindow.css";

class ConfirmModalWindow extends React.Component {
  hideModalWindow(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onCancel();
  }

  getHidden() {
    if (this.props.isHidden === true) {
      return " hidden";
    } else return "";
  }

  render() {
    return (
      <ModalWindow
        onClose={event => this.props.onCancel(event)}
        isHidden={this.props.isHidden}
      >
        <form onClick={event => event.stopPropagation()}>
          <h1 className="h1">{this.props.title}</h1>
          <p>{this.props.message}</p>
          <Button
            isPrimary={true}
            value="Да"
            onClick={event => {
              this.hideModalWindow(event);
              this.props.onConfirm(event);
            }}
          />
          <Button
            value="Отмена"
            onClick={event => this.hideModalWindow(event)}
          />
        </form>
      </ModalWindow>
    );
  }
}

export default ConfirmModalWindow;
