import React from "react";
import "./button.css";

class Button extends React.Component {
  onClick(event) {
    if (!!this.props.onClick) {
      return this.props.onClick(event);
    }
    return () => {};
  }

  render() {
    return (
      <input
        type="submit"
        className={!!this.props.isPrimary ? "button primary" : "button"}
        value={this.props.value}
        onClick={event => {
          this.onClick(event);
        }}
      />
    );
  }
}

export default Button;
