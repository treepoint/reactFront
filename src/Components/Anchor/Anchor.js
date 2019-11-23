import React from "react";
import "./Anchor.css";

class Anchor extends React.Component {
  render() {
    return <div className="anchor">{this.props.children}</div>;
  }
}
export default Anchor;
