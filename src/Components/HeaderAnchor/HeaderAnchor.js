import React from "react";
import "./headerAnchor.css";

class HeaderAnchor extends React.Component {
  render() {
    return <div className="headerAnchor">{this.props.children}</div>;
  }
}
export default HeaderAnchor;
