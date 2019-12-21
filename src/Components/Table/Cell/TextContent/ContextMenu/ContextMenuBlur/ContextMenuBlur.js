import React from "react";
import "./ContextMenuBlur.css";

class ContextMenuBlur extends React.Component {
  render() {
    return (
      <div
        className="contextMenuBlur"
        onClick={event => {
          this.props.onClick(event);
        }}
        onContextMenu={event => {
          this.props.onContextMenu(event);
        }}
        onWheel={event => {
          this.props.onClick(event);
        }}
      />
    );
  }
}

export default ContextMenuBlur;
