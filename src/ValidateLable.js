import React from "react";

class ValidateLable extends React.Component {
  render() {
    return (
      <div>
        <p
          style={{
            // backgroundColor: "rgba(255, 205, 205, 0.34)",
            //borderBottom: "1px solid rgba(220, 41, 41, 0.63)",
            fontSize: "13.3333px",
            fontFamily: "sans-serif",
            padding: "4px",
            marginTop: "2px",
            color: "#404040",
            display: this.props.display
          }}
        >
          {this.props.validate}
        </p>
      </div>
    );
  }
}

export default ValidateLable;
