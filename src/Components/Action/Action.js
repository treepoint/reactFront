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
    if (this.props.disabled) {
      return "action disabled";
    }

    if (!!this.props.isPressed) {
      return "action pressed";
    } else {
      return "action";
    }
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={Object.assign(
          {
            background:
              "url(" + this.props.icon + ") no-repeat scroll transparent"
          },
          this.props.style
        )}
        onClick={event => this.onClick(event)}
      ></div>
    );
  }
}

export default Action;
