import React from "react";
//Картинки
import addIcon from "../../../Images/icon_add_96.png";
import addWTimeIcon from "../../../Images/icon_add_w_time_96.png";
//CSS
import "./StartStep.css";

class StartStep extends React.PureComponent {
  //Кнопка «создать и делать сейчас»
  getCreateAndExecuteButton() {
    return (
      <div
        className="startStepButtonContainer"
        style={{
          background:
            "url(" + addWTimeIcon + ") no-repeat scroll 4px 2px transparent",
          backgroundSize: "96px 96px",
        }}
        onClick={() => this.props.setCurrentStep("createAndExecute")}
      >
        <div className="startStepButtonLable">Создать и делать сейчас </div>
      </div>
    );
  }

  //Кнопка «создать»
  getCreateButton() {
    return (
      <div
        className="startStepButtonContainer"
        style={{
          background:
            "url(" + addIcon + ") no-repeat scroll 4px 2px transparent",
          backgroundSize: "96px 96px",
        }}
        onClick={() => this.props.setCurrentStep("onlyCreate")}
      >
        <div className="startStepButtonLable">Создать </div>
      </div>
    );
  }

  render() {
    return (
      <div className="startStepContainer">
        {this.getCreateAndExecuteButton()}
        <div className="startStepVhHr" />
        {this.getCreateButton()}
      </div>
    );
  }
}

export default StartStep;
