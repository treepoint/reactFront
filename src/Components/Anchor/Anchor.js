import React from "react";
import "./anchor.css";

class Anchor extends React.Component {
  render() {
    return <div className="anchor">{this.props.children}</div>;
  }
}
export default Anchor;
