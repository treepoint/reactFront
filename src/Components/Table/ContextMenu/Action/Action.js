import React from "react";
import "./Action.css";

class Action extends React.Component {
  render() {
    return (
      <div
        className="action"
        style={{
          background:
            "url(" + this.props.icon + ") no-repeat scroll 100% 0 transparent",
          backgroundSize: "18px 18px"
        }}
      ></div>
    );
  }
}

export default Action;
