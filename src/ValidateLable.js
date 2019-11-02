import React from "react";

class ValidateLable extends React.Component {
  render() {
    return (
      <div
        className="validationLable"
        style={{
          display: this.props.display
        }}
      >
        {this.props.validate}
      </div>
    );
  }
}

export default ValidateLable;
