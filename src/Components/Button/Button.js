import React from "react";
import "./Button.css";

class Button extends React.PureComponent {
  render() {
    return (
      <input
        name={this.props.name}
        type="submit"
        style={this.props.style}
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
