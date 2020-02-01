import React from "react";
import "./LableValidation.css";

class LableValidation extends React.PureComponent {
  render() {
    let error = !!this.props.value ? " error" : "";

    return <div className={"validation" + error}>{this.props.value}</div>;
  }
}

export default LableValidation;
