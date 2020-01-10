import React from "react";
import "./Blur.css";

class Blur extends React.Component {
  render() {
    return (
      <div
        className="blur"
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

export default Blur;
