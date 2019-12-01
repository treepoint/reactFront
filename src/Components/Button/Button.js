import React from "react";
import "./Button.css";

class Button extends React.Component {
  render() {
    return (
      <input
        type="submit"
        className={!!this.props.isPrimary ? "button primary" : "button"}
        value={this.props.value}
        onClick={event => {
          this.props.onClick(event);
        }}
      />
    );
  }
}

export default Button;
