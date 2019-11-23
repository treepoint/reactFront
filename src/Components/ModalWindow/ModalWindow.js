import React from "react";
import "./ModalWindow.css";

class ModalWindow extends React.Component {
  render() {
    return (
      <div className="blur" onClick={event => this.props.onClick(event)}>
        <div className="close" />
        <div className="modal">{this.props.contentToWrap}</div>
      </div>
    );
  }
}

export default ModalWindow;
