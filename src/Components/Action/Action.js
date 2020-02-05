import React from "react";
import "./Action.css";

class Action extends React.PureComponent {
  onClick(event) {
    if (typeof this.props.onClick !== "function") {
      return;
    }

    this.props.onClick(event);
  }

  getClassName() {
    let className = "action";

    if (this.props.disabled) {
      className += " disabled";
    }

    if (!!this.props.isPressed) {
      className += " pressed";
    }

    if (!!this.props.isTransparent) {
      className += " transparent";
    }

    if (!!this.props.isVanishing) {
      className += " vanishing";
    }

    if (!!this.props.isFlicker) {
      className += " flicker";
    }

    return className;
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={Object.assign(
          {
            background:
              "url(" +
              this.props.icon +
              ") no-repeat scroll 50% 50% transparent"
          },
          this.props.style
        )}
        onClick={event => this.onClick(event)}
      ></div>
    );
  }
}

export default Action;
