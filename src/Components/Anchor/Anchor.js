import React from "react";
import "./Anchor.css";

class Anchor extends React.PureComponent {
  render() {
    return <div className="anchor">{this.props.children}</div>;
  }
}
export default Anchor;
