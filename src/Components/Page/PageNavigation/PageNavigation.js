import React from "react";
import "./PageNavigation.css";

class PageNavigation extends React.Component {
  render() {
    return (
      <div className="pageNavigation container">{this.props.children}</div>
    );
  }
}

export default PageNavigation;
