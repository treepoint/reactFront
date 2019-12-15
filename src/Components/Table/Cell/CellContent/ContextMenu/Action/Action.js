import React from "react";
import "./Action.css";

class Action extends React.Component {
  render() {
    return (
      <div
        className={!!this.props.isPressed ? "action pressed" : "action"}
        style={{
          background:
            "url(" + this.props.icon + ") no-repeat scroll 4px 2px transparent",
          backgroundSize: "24px 24px"
        }}
        onClick={event => this.props.onClick(event)}
      ></div>
    );
  }
}

export default Action;
