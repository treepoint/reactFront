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
        onMouseUp={
          !!this.props.onMouseUp ? (event) => this.props.onMouseUp(event) : null
        }
        onClick={
          !!this.props.onClick ? (event) => this.props.onClick(event) : null
        }
      />
    );
  }
}

export default Button;
