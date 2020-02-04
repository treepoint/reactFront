import React from "react";
//Redux
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../../Store/actions/tasks";
import { createTaskLog } from "../../Store/actions/tasksLog";
//Компоненты
import TextContent from "../TextContent/TextContent";
import SelectContent from "../SelectContent/SelectContent";
import TimeContent from "../TimeContent/TimeContent";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";
import Action from "../Action/Action";
//Утилиты
import { getCurrentTimeFormat, getTimeFromMins } from "../../Libs/TimeUtils";
//Картинки
import deleteIcon from "../../Images/icon_delete.png";
import archiveIcon from "../../Images/icon_archive.png";
import dearchiveIcon from "../../Images/icon_dearchive.png";
import timeSpanIcon from "../../Images/icon_time_span.png";
import minimizeIcon from "../../Images/icon_minimize.png";
import maximizedIcon from "../../Images/icon_maximized.png";
import iconFire from "../../Images/icon_fire.png";
import iconFireRed from "../../Images/icon_fire_red.png";
//CSS
import "./Task.css";

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalWindowHidden: true,
      isMinimized: true,
      isOnFire: false
    };
  }

  componentDidMount() {
    this.setState({ isMinimized: this.props.isAllMinimize });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isAllMinimize !== this.props.isAllMinimize &&
      this.props.isAllMinimize !== this.state.isMinimized
    ) {
      this.setState({ isMinimized: this.props.isAllMinimize });
    }
  }

  //Сохраним задачу в ДБ
  saveTaskToDatabase(diff) {
    let task = {
      id: this.props.content.id,
      name: this.props.content.name,
      name_style: this.props.content.name_style,
      status_id: this.props.content.statuses.current,
      category_id: this.props.content.categories.current,
      execution_time_day: this.props.content.execution_time_day,
      execution_time_all: this.props.content.execution_time_all,
      in_archive: this.props.content.in_archive,
      update_date: this.props.date + " " + getCurrentTimeFormat()
    };

    //Склеим объект и разницу
    Object.assign(task, diff);

    this.props.updateTask(task, this.props.date);
  }

  getTaskName() {
    return (
      <div className="textField">
        <TextContent
          value={this.props.content.name}
          width={240}
          height={68}
          isStylable={false}
          //Стиль оформления контента
          /*     bold={this.props.content.name_style.bold}
          italic={this.props.content.name_style.italic}
          backgroundColor={this.props.content.name_style.backgroundColor} */
          //Функции
          onChangeStyle={style => {
            this.saveTaskToDatabase({ name_style: style });
          }}
          onChangeValue={value => this.saveTaskToDatabase({ name: value })}
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
          value={this.props.content.statuses}
          height={34}
          onChangeValue={status =>
            this.saveTaskToDatabase({ status_id: status.current })
          }
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
          value={this.props.content.categories}
          height={34}
          onChangeValue={category =>
            this.saveTaskToDatabase({ category_id: category.current })
          }
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
          За день:
        </div>
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

  getExecutionTimeAll() {
    return (
      <div
        className={!!this.state.isMinimized ? "timeField hidden" : "timeField"}
      >
        <div className="timeLabel">Всего: </div>
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

  getActions() {
    return (
      <div className="taskActions">
        <div className={!!this.state.isOnFire ? "flicker" : null}>
          <Action
            style={{
              marginLeft: "6px",
              paddingTop: "1px",
              opacity: !!this.state.isOnFire ? 0.8 : 0.3
            }}
            icon={!!this.state.isOnFire ? iconFireRed : iconFire}
            onClick={() => this.setState({ isOnFire: !this.state.isOnFire })}
          />
        </div>

        {!!this.props.content.in_archive ? null : (
          <Action
            style={{ marginLeft: "6px", paddingTop: "1px", opacity: 0.3 }}
            icon={timeSpanIcon}
            onClick={() =>
              this.props.createTaskLog(this.props.content.id, this.props.date)
            }
          />
        )}

        {!!this.props.content.in_archive ? (
          <React.Fragment>
            <Action
              style={{ marginLeft: "6px", paddingTop: "1px", opacity: 0.3 }}
              icon={dearchiveIcon}
              onClick={() => this.saveTaskToDatabase({ in_archive: 0 })}
            />
            <Action
              style={{ marginLeft: "6px", paddingTop: "1px", opacity: 0.3 }}
              icon={deleteIcon}
              onClick={() => this.setState({ isModalWindowHidden: false })}
            />
          </React.Fragment>
        ) : (
          <Action
            style={{ marginLeft: "6px", paddingTop: "1px", opacity: 0.3 }}
            icon={archiveIcon}
            onClick={() => this.saveTaskToDatabase({ in_archive: 1 })}
          />
        )}
        <Action
          style={{ marginLeft: "6px", paddingTop: "1px", opacity: 0.3 }}
          icon={!!this.state.isMinimized ? maximizedIcon : minimizeIcon}
          onClick={() =>
            this.setState({ isMinimized: !this.state.isMinimized })
          }
        />
      </div>
    );
  }

  getOptionalPart() {
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

  getDeleteModalWindow() {
    if (!this.state.isModalWindowHidden) {
      return (
        <ConfirmModalWindow
          title="Удалить задачу?"
          message="Вместе с задачей будут удалены все записи из лога и статистики. 
                   Если вы хотите закрыть задачу — проставьте у неё статус с типом «Окончательный»."
          onCancel={() => this.setState({ isModalWindowHidden: true })}
          onConfirm={() => this.props.deleteTask(this.props.content.id)}
        />
      );
    }
  }

  render() {
    return (
      <div className={!!this.state.isOnFire ? "task onFire" : "task"}>
        {this.getDeleteModalWindow()}
        {this.getTaskName()}
        {this.getOptionalPart()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTask: (task, forDate) => {
      dispatch(updateTask(task, forDate));
    },
    deleteTask: id => {
      dispatch(deleteTask(id));
    },
    createTaskLog: (taskId, date) => {
      dispatch(createTaskLog(taskId, date));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
