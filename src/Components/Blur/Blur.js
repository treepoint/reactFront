import React from "react";
import "./Blur.css";

class Blur extends React.PureComponent {
  render() {
    return (
      <div
        className="blur"
        style={this.props.style}
        onClick={
          !!this.props.onClick
            ? (event) => {
                this.props.onClick(event);
              }
            : null
        }
        onContextMenu={
          !!this.props.onContextMenu
            ? (event) => {
                this.props.onContextMenu(event);
              }
            : null
        }
        onWheel={
          !!this.props.onClick
            ? (event) => {
                this.props.onClick(event);
              }
            : null
        }
      />
    );
  }
}

export default Blur;
