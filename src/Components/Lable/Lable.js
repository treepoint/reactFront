import React from "react";
import "./Lable.css";

class Lable extends React.PureComponent {
  render() {
    return <div className="lable">{this.props.children}</div>;
  }
}

export default Lable;
