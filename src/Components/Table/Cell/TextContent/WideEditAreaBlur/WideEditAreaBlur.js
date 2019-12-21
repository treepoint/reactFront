import React from "react";
import "./WideEditAreaBlur.css";

class WideEditAreaBlur extends React.Component {
  render() {
    return (
      <div
        className="wideEditAreaBlur"
        onClick={event => {
          this.props.onClick(event);
        }}
        onContextMenu={event => {
          this.props.onContextMenu(event);
        }}
        onWheel={event => {
          this.props.onClick(event);
        }}
      />
    );
  }
}

export default WideEditAreaBlur;
