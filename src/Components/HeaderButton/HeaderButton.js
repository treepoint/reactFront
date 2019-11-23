import React from "react";
import "./headerButton.css";

class HeaderButton extends React.Component {
  render() {
    return (
      <div
        className="headerButton"
        onClick={event => this.props.onClick(event)}
      >
        {this.props.value}
      </div>
    );
  }
}
export default HeaderButton;
