import React from "react";
import Action from "../../../Action/Action";
import "./ContextMenuAction.css";

class ContextMenuAction extends React.PureComponent {
  render() {
    return (
      <div className="contextMenuAction">
        <Action
          icon={this.props.icon}
          isPressed={this.props.isPressed}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

export default ContextMenuAction;
