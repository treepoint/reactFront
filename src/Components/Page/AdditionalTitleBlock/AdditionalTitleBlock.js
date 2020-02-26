import React from "react";
import "./AdditionalTitleBlock.css";

class AdditionalTitleBlock extends React.PureComponent {
  render() {
    return (
      !!this.props.children ?
        <div className="additionalTitleBlock">{this.props.children}</div> : null
    );
  }
}

export default AdditionalTitleBlock;
