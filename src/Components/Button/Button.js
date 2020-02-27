import React from "react";
import "./Button.css";

class Button extends React.PureComponent {
  getClassName() {
    let className = "button";

    if (this.props.isPrimary) {
      className += " primary";
    }

    if (this.props.isDisabled) {
      className += " disabled";
    }
    return className;
  }

  render() {
    return (
      <input
        name={this.props.name}
        type="submit"
        style={this.props.style}
        disabled={this.props.isDisabled}
        className={this.getClassName()}
        value={this.props.value}
        onClick={event => {
          this.props.onClick(event);
        }}
      />
    );
  }
}

export default Button;
