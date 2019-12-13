import React from "react";
import Action from "./Action/Action";
import iconBold from "../../../Images/icon_bold.png";
import iconItalic from "../../../Images/icon_italic.png";
import "./ContextMenu.css";

class ContextMenu extends React.Component {
  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <div>
        <div
          className={
            !!this.props.contextMenuIsHidden
              ? "blurContextMenu hidden"
              : "blurContextMenu"
          }
          onClick={() => this.props.setContextMenuHidden()}
          onContextMenu={event => {
            event.preventDefault();
            this.props.setContextMenuHidden();
          }}
        />
        <div
          autoFocus="true"
          tabindex="1"
          className={
            !!this.props.contextMenuIsHidden
              ? "contextMenu hidden"
              : "contextMenu"
          }
          onClick={event => this.onClick(event)}
        >
          <Action icon={iconBold} />
          <Action icon={iconItalic} />
        </div>
      </div>
    );
  }
}

export default ContextMenu;
