import React from "react";
import "./broadCastMessage.css";

class BroadCastMessage extends React.Component {
  render() {
    return <div className="broadCastMessage">{this.props.message}</div>;
  }
}

export default BroadCastMessage;
