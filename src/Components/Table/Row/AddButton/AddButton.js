import React from "react";
import Action from "../../../Action/Action";
import addIcon from "../../../../Images/icon_add.png";
import "./AddButton.css";

class AddButton extends React.Component {
  render() {
    let onClick;

    if (!this.props.disabled) {
      onClick = () => this.props.addRowToDataBase();
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
