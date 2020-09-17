import React from "react";
//Компоненты
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";
import TextContent from "../TextContent/TextContent";
import SelectContent from "../SelectContent/SelectContent";
import TimeContent from "../TimeContent/TimeContent";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
//Утилиты
import { getTimeFromMins } from "../../Libs/TimeUtils";
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

  //Категория
  getCategorySelect() {
    return (
      <div className="taskSelect">
        <SelectContent
          isMinimized={false}
          value={this.props.content.categories}
          height={34}
          onChangeValue={category =>
            this.props.saveTaskToDatabase({ category_id: category.current })
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

  //Время выполнения за день
  getExecutionTimeDay() {
    return (
      <div className="taskTime">
        <div className="timeContentExtendWindowWrapper">
          <TimeContent
            disabled={true}
            isStandalone={true}
            value={getTimeFromMins(this.props.content.execution_time_day)}
            width={50}
            height={34}
          />
        </div>
        <div className="taskTimeLabel">(за сегодня, часы)</div>
      </div>
    );
  }

  //Время выполнения всего
  getExecutionTimeAll() {
    return (
      <div className="taskTime">
        <div className="timeContentExtendWindowWrapper">
          <TimeContent
            disabled={true}
            isStandalone={true}
            value={getTimeFromMins(this.props.content.execution_time_all)}
            width={50}
            height={34}
          />
        </div>
        <div className="taskTimeLabel">(всего, часы)</div>
      </div>
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
            <div className="taskSidebar">
              <div className="taskSelectsContainer">
                {//Выбор категории
                this.getCategorySelect()}
              </div>
              <div className="taskActionsContainer">
                {//Таймер
                !!!this.props.content.closed_date
                  ? this.props.getTimeSpanAction(
                      null,
                      { "margin-left": 0 },
                      true
                    )
                  : null}
                {//Выполнить или вернуть для выполнения
                this.props.getCompleteActions(null, null, true)}
                {//Огонь
                this.props.getOnFireAction(null, null, true)}
                {//Заморозить
                this.props.getFrozenAction(null, null, true)}
                {//Перенос
                !!!this.props.content.closed_date
                  ? this.props.getNewDateAction(null, null, true)
                  : null}
                {//Удаление задачи
                !!this.props.content.closed_date
                  ? this.props.getDeleteTaskAction(null, null, true)
                  : null}
              </div>
              <div className="taskTimeContainer">
                {//Время выполнения всего
                this.getExecutionTimeAll()}
                {//Время выполнения за день
                this.getExecutionTimeDay()}
              </div>
            </div>
          </div>
        </div>
      </ConfirmModalWindow>
    );
  }
}

export default ExtendTaskWindow;
