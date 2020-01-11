import React from "react";
import Action from "../../../Action/Action";
import deleteIcon from "../../../../Images/icon_delete.png";
import "./DeleteButton.css";

class DeleteButton extends React.Component {
  render() {
    let onClick;

    if (!this.props.disabled) {
      onClick = () => this.props.deleteRow();
    }

    return (
      <div
        className="deleteButton"
        style={{ marginLeft: this.props.tableWidth + "px" }}
      >
        <Action
          icon={deleteIcon}
          onClick={onClick}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default DeleteButton;
