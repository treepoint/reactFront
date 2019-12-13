import React from "react";
import Action from "./Action/Action";
import "./ContextMenu.css";
import iconBold from "../../../Images/icon_bold.png";
import iconItalic from "../../../Images/icon_italic.png";

class ContextMenu extends React.Component {
  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <div
        className={this.props.className}
        onClick={event => this.onClick(event)}
      >
        <Action icon={iconBold} />
        <Action icon={iconItalic} />
      </div>
    );
  }
}

export default ContextMenu;
