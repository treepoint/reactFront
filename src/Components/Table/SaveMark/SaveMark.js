import React from "react";
import saveIcon from "../../../Images/icon_save.png";
import "./SaveMark.css";

class SaveMark extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isDisplayed: false
    };
  }

  componentDidUpdate() {
    //Ежели сейчас показываем, но пришло указание скрыть
    if (this.state.isDisplayed && !this.props.isSaving) {
      //Повесим небольшую задержку на скрытие
      setTimeout(
        function() {
          this.setState({ isDisplayed: false });
        }.bind(this),
        500
      );
    } else {
      if (this.state.isDisplayed !== this.props.isSaving) {
        this.setState({ isDisplayed: this.props.isSaving });
      }
    }
  }

  render() {
    if (!this.state.isDisplayed) {
      return null;
    }

    return (
      <div
        className={!!this.state.isDisplayed ? "saveMark" : "saveMark hidden"}
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
