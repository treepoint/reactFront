import React from "react";
import Action from "../Action/Action";
import "./TaskAction.css";

class TaskAction extends React.PureComponent {
  render() {
    return (
      <div className="taskAction">
        <Action icon={this.props.icon} onClick={this.props.onClick} />
      </div>
    );
  }
}

export default TaskAction;
