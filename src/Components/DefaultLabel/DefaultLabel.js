import React from "react";
import "./DefaultLabel.css";

class DefaultLabel extends React.Component {
  render() {
    return (
      <div>
        {this.props.title}
        {this.props.value}
      </div>
    );
  }
}

export default DefaultLabel;
