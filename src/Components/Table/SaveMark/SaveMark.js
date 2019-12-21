import React from "react";
import saveIcon from "../../../Images/icon_save.png";
import "./SaveMark.css";

class SaveMark extends React.Component {
  render() {
    if (this.props.isDisplayed === "notInit") {
      return <div />;
    }

    return (
      <div
        className={!!this.props.isDisplayed ? "saveMark" : "saveMark hidden"}
        style={{
          background:
            "url(" + saveIcon + ") no-repeat scroll 100% 0 transparent",
          backgroundSize: "34px 34px",
          marginLeft: this.props.marginLeft - 34 + "px"
        }}
      />
    );
  }
}

export default SaveMark;
