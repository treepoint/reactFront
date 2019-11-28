import React from "react";
import "./ErrorMessage.css";

class ErrorMessage extends React.Component {
  render() {
    let className = !!this.props.isWarning
      ? "errorMessage warning"
      : "errorMessage";

    return (
      <div
        className={className}
        style={{
          display: !!this.props.message ? "" : "none"
        }}
      >
        {this.props.message}
      </div>
    );
  }
}

export default ErrorMessage;
