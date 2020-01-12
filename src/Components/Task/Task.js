import React from "react";
import TextContent from "../TextContent/TextContent";
import SelectContent from "../SelectContent/SelectContent";
import TimeContent from "../TimeContent/TimeContent";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";
import Action from "../Action/Action";
import deleteIcon from "../../Images/icon_delete.png";
import timeSpanIcon from "../../Images/icon_time_span.png";
import minimizeIcon from "../../Images/icon_minimize.png";
import maximizedIcon from "../../Images/icon_maximized.png";
import "./Task.css";

import {
  updateTask,
  deleteTask,
  createTaskLog
} from "../../APIController/APIController";
import { getCurrentTimeFormat } from "../../Libs/TimeUtils";

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      content: {
        name: {
          value: null,
          style: { backgroundColor: "#fff", bold: false, italic: false }
        },
        status_id: { value: null },
        category_id: { value: null },
        execution_time_day: { value: null },
        execution_time_all: { value: null }
      },
      deleteModalWindow: { isHidden: true },
      isMinimized: true
    };
  }

  componentDidMount() {
    this.setState({ content: this.props.content });
  }

  componentDidUpdate() {
    if (
      JSON.stringify(this.props.content) !== JSON.stringify(this.state.content)
    ) {
      this.setState({ content: this.props.content });
    }
  }

  minimizeTask() {
    this.setState({ isMinimized: !this.state.isMinimized });
  }

  //Закрыть модальное окно
  closeDeleteModal() {
    this.setState({ deleteModalWindow: { isHidden: true } });
  }

  //Показать модальное окно
  showDeleteModal(row) {
    this.setState({ deleteModalWindow: { isHidden: false } });
  }

  //Сохраним изменяемую строку в ДБ
  saveTaskToDatabase(callback) {
    let task = {
      id: this.state.content.id.value,
      name: this.state.content.name.value,
      name_style: this.state.content.name.style,
      status_id: this.state.content.status_id.value.current,
      category_id: this.state.content.category_id.value.current
    };

    updateTask(
      Object.assign(task, {
        update_date: this.props.date + " " + getCurrentTimeFormat()
      }),
      ok => {
        if (ok) {
          this.props.getTasks(callback);
          this.props.getTasksLog();
        }
      }
    );
  }

  //Удалим задачу из ДБ
  deleteRowFromDataBase() {
    deleteTask(this.state.content.id.value, ok => {
      if (ok) {
        this.props.getTasks();
        this.props.getTasksLog();
      }
    });
  }

  //Обрабатываем изменение контента
  onChangeName(value) {
    this.setState(
      {
        content: Object.assign(this.state.content, {
          name: { value, style: this.state.content.name.style }
        })
      },
      this.saveTaskToDatabase()
    );
  }

  //Добавим лог по задаче в ДБ
  addRowToDataBase() {
    let taskLog = {
      task_id: this.state.content.id.value,
      comment: "",
      execution_start: this.props.date + " " + getCurrentTimeFormat(),
      execution_end: this.props.date
    };

    createTaskLog(taskLog, ok => {
      if (ok) {
        this.props.getTasksLog();
      }
    });
  }

  //Обрабатываем изменение контента
  onChangeNameStyle(style) {
    this.setState(
      {
        content: Object.assign(this.state.content, {
          name: { value: this.state.content.name.value, style }
        })
      },
      this.saveTaskToDatabase()
    );
  }

  //Обрабатываем изменение контента
  onChangeStatus(status) {
    this.setState(
      {
        content: Object.assign(this.state.content, {
          status_id: {
            value: {
              current: status.current,
              list: this.state.content.status_id.value.list
            }
          }
        })
      },
      this.saveTaskToDatabase()
    );
  }

  //Обрабатываем изменение контента
  onChangeCategory(category) {
    this.setState(
      {
        content: Object.assign(this.state.content, {
          category_id: {
            value: {
              current: category.current,
              list: this.state.content.category_id.value.list
            }
          }
        })
      },
      this.saveTaskToDatabase()
    );
  }

  getTaskName() {
    return (
      <div className="textField">
        <TextContent
          value={this.state.content.name.value}
          width={226}
          height={68}
          isStylable={true}
          style={this.state.content.name.style}
          onChangeStyle={style => {
            this.onChangeNameStyle(style);
          }}
          onChangeValue={value => this.onChangeName(value)}
        />
      </div>
    );
  }

  getStatusSelect() {
    return (
      <div
        className={
          !!this.state.isMinimized ? "selectField" : "selectField full"
        }
      >
        <SelectContent
          isMinimized={this.state.isMinimized}
          value={this.state.content.status_id.value}
          height={34}
          onChangeValue={value => this.onChangeStatus(value)}
        />
      </div>
    );
  }

  getCategorySelect() {
    return (
      <div
        className={
          !!this.state.isMinimized ? "selectField" : "selectField full"
        }
      >
        <SelectContent
          isMinimized={this.state.isMinimized}
          value={this.state.content.category_id.value}
          height={34}
          onChangeValue={value => this.onChangeCategory(value)}
        />
      </div>
    );
  }

  getExecutionTimeDay() {
    return (
      <div className="timeField">
        <div
          className={
            !!this.state.isMinimized ? "timeLabel hidden" : "timeLabel"
          }
        >
          За день:{" "}
        </div>
        <div style={{ width: "60px", height: "34px", marginBottom: "12px" }}>
          <TimeContent
            disabled={true}
            isStandalone={true}
            value={this.state.content.execution_time_day.value}
            width={50}
            height={34}
          />
        </div>
      </div>
    );
  }

  getExecutionTimeAll() {
    return (
      <div
        className={!!this.state.isMinimized ? "timeField hidden" : "timeField"}
      >
        <div className="timeLabel">Всего: </div>
        <div style={{ width: "60px", height: "34px" }}>
          <TimeContent
            disabled={true}
            isStandalone={true}
            value={this.state.content.execution_time_all.value}
            width={50}
            height={34}
          />
        </div>
      </div>
    );
  }

  getActions() {
    return (
      <div className="taskActions">
        <Action icon={timeSpanIcon} onClick={() => this.addRowToDataBase()} />
        <Action icon={deleteIcon} onClick={() => this.showDeleteModal()} />
        <Action
          icon={!!this.state.isMinimized ? maximizedIcon : minimizeIcon}
          onClick={() => this.minimizeTask()}
        />
      </div>
    );
  }

  getOptionlaPart() {
    if (this.state.isMinimized) {
      return (
        <div className="optionalPart">
          {this.getStatusSelect()}
          {this.getCategorySelect()}
          <div className="executionTime">{this.getExecutionTimeDay()}</div>
          {this.getActions()}
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <div className="optionalPart full">
            {this.getStatusSelect()}
            {this.getCategorySelect()}
            <div className="executionTime">
              {this.getExecutionTimeDay()}
              {this.getExecutionTimeAll()}
            </div>
          </div>
          {this.getActions()}
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <ConfirmModalWindow
          title="Удалить задачу?"
          message="Вместе с задачей будут удалены все записи из лога и статистики. 
      Если вы хотите закрыть задачу — проставьте у неё статус с типом «Окончательный»."
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() => this.deleteRowFromDataBase()}
        />
        <div className="task">
          {this.getTaskName()}
          {this.getOptionlaPart()}
        </div>
      </React.Fragment>
    );
  }
}

export default Task;
