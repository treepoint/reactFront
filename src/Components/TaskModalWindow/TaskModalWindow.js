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
import "./TaskModalWindow.css";

class TaskModalWindow extends React.PureComponent {
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

  //Статус
  getStatusSelect() {
    return (
      <div className="taskSelect">
        Статус:
        <SelectContent
          isMinimized={false}
          value={this.props.content.statuses}
          height={34}
          onChangeValue={status =>
            this.props.saveTaskToDatabase({ status_id: status.current })
          }
        />
      </div>
    );
  }

  //Категория
  getCategorySelect() {
    return (
      <div className="taskSelect">
        Категория:
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

  //Время выполнения всего
  getExecutionTimeAll() {
    return (
      <div className="taskTime">
        Всего времени:
        <TimeContent
          disabled={true}
          isStandalone={true}
          value={getTimeFromMins(this.props.content.execution_time_all)}
          width={50}
          height={34}
        />
      </div>
    );
  }

  //Время выполнения за день
  getExecutionTimeDay() {
    return (
      <div className="taskTime">
        Времени за сегодня:
        <TimeContent
          disabled={true}
          isStandalone={true}
          value={getTimeFromMins(this.props.content.execution_time_day)}
          width={50}
          height={34}
        />
      </div>
    );
  }

  render() {
    return (
      <ConfirmModalWindow
        isButtonless={true}
        onCancel={() => this.props.onCancel()}
      >
        <div className="taskModalWindow">
          {//Название задачи
          this.getTaskName()}
          <div className="taskContentContainer">
            {//Описание задачи
            this.getTaskDescription()}
            <div className="taskSidebar">
              <div className="taskSelectsContainer">
                {//Выбор статуса
                this.getStatusSelect()}
                {//Выбор категории
                this.getCategorySelect()}
              </div>
              <div className="taskActionsContainer">
                {//Таймер
                !!!this.props.content.in_archive
                  ? this.props.getTimeSpanAction("включить таймер", {
                      paddingTop: "1px",
                      marginBottom: "6px"
                    })
                  : null}
                {//Огонь
                this.props.getOnFireAction("все в огне!", {
                  paddingTop: "1px",
                  marginBottom: "6px"
                })}
                {//Перенос
                !!!this.props.content.in_archive
                  ? this.props.getNewDateAction("перенести на другую дату", {
                      paddingTop: "1px",
                      marginBottom: "6px"
                    })
                  : null}
                {//Архив и из архива
                this.props.getArchiveActions(
                  !!this.props.content.in_archive
                    ? "достать из архива"
                    : "в архив",
                  {
                    paddingTop: "1px",
                    marginBottom: "6px"
                  }
                )}
                {//Удаление задачи
                !!this.props.content.in_archive
                  ? this.props.getDeleteTaskAction("удалить задачу", {
                      paddingTop: "1px",
                      marginBottom: "6px"
                    })
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

export default TaskModalWindow;
