import React from "react";
import Action from "../../../Action/Action";
import addIcon from "../../../../Images/icon_add.png";
import "./AddButton.css";

class AddButton extends React.PureComponent {
  render() {
    let onClick;

    if (!this.props.disabled) {
      onClick = () => this.props.addRow();
    }

    return (
      <div className="addButton">
        <Action
          icon={addIcon}
          onClick={onClick}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default AddButton;
