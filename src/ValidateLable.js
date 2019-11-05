import React from "react";

class ValidateLable extends React.Component {
  render() {
    let error = !!this.props.value ? " error" : "";

    return <div className={"validationLable" + error}>{this.props.value}</div>;
  }
}

export default ValidateLable;
