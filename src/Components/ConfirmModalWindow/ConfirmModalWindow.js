import React from "react";
import Button from "../Button/Button";
import ModalWindow from "../ModalWindow/ModalWindow";

class ConfirmModalWindow extends React.PureComponent {
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
        onClose={(event) => this.props.onCancel(event)}
        isHidden={this.props.isHidden}
      >
        <form onClick={(event) => event.stopPropagation()}>
          {!!this.props.title ? (
            <h1 className="h1">{this.props.title}</h1>
          ) : null}
          {!!this.props.message ? <p>{this.props.message}</p> : null}
          <p>{this.props.children}</p>
          {!!this.props.isButtonless ? null : (
            <React.Fragment>
              <Button
                isPrimary={true}
                isDisabled={this.props.isConfirmButtonDisabled}
                value={
                  !!this.props.confirmButtonLable
                    ? this.props.confirmButtonLable
                    : "Да"
                }
                onClick={(event) => {
                  this.hideModalWindow(event);
                  this.props.onConfirm(event);
                }}
              />
              <Button
                value="Отмена"
                onClick={(event) => this.hideModalWindow(event)}
              />
            </React.Fragment>
          )}
        </form>
      </ModalWindow>
    );
  }
}

export default ConfirmModalWindow;
