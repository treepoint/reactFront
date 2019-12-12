import React from "react";
import "./BroadCastMessage.css";

class BroadCastMessage extends React.Component {
  render() {
    return <div className="broadCastMessage">{this.props.message}</div>;
  }
}

export default BroadCastMessage;
