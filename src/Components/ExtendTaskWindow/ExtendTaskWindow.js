import React from "react";
//Компоненты
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";
import TextContent from "../TextContent/TextContent";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
//CSS
import "./ExtendTaskWindow.css";

class ExtendTaskWindow extends React.PureComponent {
  /*
   * Описания блоков
   */

  //Название
  getTaskName() {
    return (
      <div className="taskName">
        <TextContent
          value={this.props.content.name}
          isStylable={false}
          //Функции
          onChangeValue={value =>
            this.props.saveTaskToDatabase({ name: value })
          }
        />
      </div>
    );
  }

  //Описание
  getTaskDescription() {
    return (
      <RichTextEditor
        data={this.props.content.description}
        onChange={description => this.props.saveTaskToDatabase({ description })}
      />
    );
  }

  render() {
    return (
      <ConfirmModalWindow
        isButtonless={true}
        onCancel={() => this.props.onCancel()}
      >
        <div className="extendTaskWindow">
          {//Название задачи
          this.getTaskName()}
          <div className="taskContentContainer">
            {/*Описание задачи*/}
            <div className="taskDescriptionContainer">
              {this.getTaskDescription()}
            </div>
          </div>
        </div>
      </ConfirmModalWindow>
    );
  }
}

export default ExtendTaskWindow;
