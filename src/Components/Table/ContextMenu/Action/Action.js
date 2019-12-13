import React from "react";
import "./Action.css";

class Action extends React.Component {
  render() {
    return (
      <div
        className={!!this.props.isPressed ? "action pressed" : "action"}
        style={{
          background:
            "url(" + this.props.icon + ") no-repeat scroll 2px 2px transparent",
          backgroundSize: "22px 22px"
        }}
        onClick={() => this.props.onClick()}
      ></div>
    );
  }
}

export default Action;
