import React from "react";
import "./page.css";

class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="title">{this.props.title}</div>
        <div className="hr" />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

export default Page;
