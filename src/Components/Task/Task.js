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
import Spacer from "../Spacer/Spacer";
import Action from "../Action/Action";
import DatePickerButton from "../DatePickerButton/DatePickerButton";
//Утилиты
import {
  getCurrentTimeFormat,
  getTimeFromMins,
  getFormatDate
} from "../../Libs/TimeUtils";
//Картинки
import deleteIcon from "../../Images/icon_delete.png";
import archiveIcon from "../../Images/icon_archive.png";
import dearchiveIcon from "../../Images/icon_dearchive.png";
import timeSpanIcon from "../../Images/icon_time_span.png";
import iconFire from "../../Images/icon_fire.png";
import iconFireRed from "../../Images/icon_fire_red.png";
import iconMenu from "../../Images/icon_menu.png";
import iconMore from "../../Images/icon_more.png";
import iconNewDate from "../../Images/icon_new_date.png";
//CSS
import "./Task.css";

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      isDeleteModalWindowHidden: true,
      isNewDateModalWindowHidden: true,
      isMinimized: true,
      isMenuOpen: false,
      movedDate: null
    };
  }

  componentDidUpdate(prevProps) {
    //Если при ре рендере здесь оказалась другая задача — сбросим данные
    if (prevProps.content.id !== this.props.content.id) {
      this.setState({
        isMinimized: true,
        isMenuOpen: false,
        movedDate: null
      });
    }
  }

  /*
   * Обработка и отрисовка данных
   */

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
      on_fire: this.props.content.on_fire,
      update_date: this.props.date + " " + getCurrentTimeFormat(),
      moved_date: this.props.content.moved_date
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
      <div className="timeField">
        <div
          className={
            !!this.state.isMinimized ? "timeLabel hidden" : "timeLabel"
          }
        >
          Всего:
        </div>
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

  /*
   * Описания экшенов
   */

  getNewDateAction() {
    return (
      <Action
        style={{ marginLeft: "6px", paddingTop: "1px" }}
        isTransparent
        icon={iconNewDate}
        onClick={() => this.setState({ isNewDateModalWindowHidden: false })}
      />
    );
  }

  getFullTaskAction() {
    return (
      <Action
        style={{
          marginLeft: "221px",
          height: "6px",
          paddingTop: "1px",
          paddingBottom: "2px"
        }}
        isVanishing
        icon={iconMore}
        onClick={() => this.setState({ isMinimized: !this.state.isMinimized })}
      />
    );
  }

  getOnFireAction() {
    return (
      <div className={!!this.state.isOnFire ? "flicker" : null}>
        <Action
          style={{
            marginLeft: "6px"
          }}
          isTransparent={!!this.props.content.on_fire ? false : true}
          icon={!!this.props.content.on_fire ? iconFireRed : iconFire}
          onClick={() =>
            this.saveTaskToDatabase({ on_fire: !this.props.content.on_fire })
          }
        />
      </div>
    );
  }

  getDeleteTaskAction() {
    return (
      <Action
        style={{ marginLeft: "6px", paddingTop: "1px" }}
        isTransparent
        icon={deleteIcon}
        onClick={() => this.setState({ isDeleteModalWindowHidden: false })}
      />
    );
  }

  getTimeSpanAction() {
    return (
      <Action
        style={{ marginLeft: "6px", paddingTop: "1px" }}
        isTransparent
        icon={timeSpanIcon}
        onClick={() =>
          this.props.createTaskLog(this.props.content.id, this.props.date)
        }
      />
    );
  }

  getArchiveActions() {
    return (
      <React.Fragment>
        {!!this.props.content.in_archive ? (
          <div className="taskMenuItem">
            <Action
              style={{ marginLeft: "6px", paddingTop: "1px" }}
              isTransparent
              icon={dearchiveIcon}
              onClick={() => this.saveTaskToDatabase({ in_archive: 0 })}
            />
          </div>
        ) : (
          <div className="taskMenuItem">
            <Action
              style={{ marginLeft: "6px", paddingTop: "1px" }}
              isTransparent
              icon={archiveIcon}
              onClick={() => this.saveTaskToDatabase({ in_archive: 1 })}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  getTaskMenuAction() {
    return (
      <Action
        style={{
          paddingTop: "9px"
        }}
        isTransparent
        isPressed={!!this.state.isMenuOpen ? true : false}
        icon={iconMenu}
        onClick={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}
      />
    );
  }

  /*
   * Сборные экшенов
   */

  getTaskMenu() {
    return !!!this.state.isMenuOpen ? null : (
      <div className="taskMenu">{this.getAllTaskActions()}</div>
    );
  }

  getShortActions() {
    return !!!this.props.content.in_archive ? (
      <div className="taskActions">
        {!!this.props.content.in_archive
          ? this.getDeleteTaskAction()
          : this.getTimeSpanAction()}
      </div>
    ) : (
      <div className="taskActions">{this.getArchiveActions()}</div>
    );
  }

  //Все действия внизу таска
  getAllTaskActions() {
    return !!this.props.content.in_archive ? (
      //Для архивной таски
      <div className="taskActions">
        {this.getOnFireAction()}
        {this.getDeleteTaskAction()}
        {this.getArchiveActions()}
      </div>
    ) : (
      //Для обычной таски
      <div className="taskActions">
        {this.getOnFireAction()}
        {this.getArchiveActions()}
        {this.getNewDateAction()}
        {this.getTimeSpanAction()}
      </div>
    );
  }

  /*
   * Опциональная часть
   */

  getOptionalPart() {
    if (this.state.isMinimized) {
      return (
        //Минимизированная версия задачи
        <div className="optionalPart">
          {/*Данные*/}
          {this.getStatusSelect()}
          {this.getCategorySelect()}
          <div className="executionTime">{this.getExecutionTimeAll()}</div>
          <Spacer />
          {/*Кнопки*/}
          {!!this.state.isMenuOpen ? (
            //Все
            <div className="taskMenu">{this.getAllTaskActions()}</div>
          ) : (
            //Только важные
            this.getShortActions()
          )}
          {/*Кнопка меню*/}
          {this.getTaskMenuAction()}
        </div>
      );
    } else {
      return (
        //Раскрытая версия задачи
        <React.Fragment>
          <div className="optionalPart full">
            {/*Данные*/}
            {this.getStatusSelect()}
            {this.getCategorySelect()}
            <div className="executionTime">
              {this.getExecutionTimeAll()}
              {this.getExecutionTimeDay()}
            </div>
          </div>
          {/*Кнопки*/}
          {this.getAllTaskActions()}
        </React.Fragment>
      );
    }
  }

  /*
   * Модалка для удаления
   */

  getDeleteModalWindow() {
    if (!this.state.isDeleteModalWindowHidden) {
      return (
        <ConfirmModalWindow
          title="Удалить задачу?"
          message="Вместе с задачей будут удалены все записи из лога и статистики. 
                   Если вы хотите закрыть задачу — проставьте у неё статус с типом «Окончательный»."
          onCancel={() => this.setState({ isDeleteModalWindowHidden: true })}
          onConfirm={() => this.props.deleteTask(this.props.content.id)}
        />
      );
    }
  }

  /*
   * Модалка для переноса задачи на другую дату
   */

  getNewDateModalWindow() {
    if (!this.state.isNewDateModalWindowHidden) {
      return (
        <ConfirmModalWindow
          title="Перенести задачу на другую дату?"
          message="Задача будет перемещена на указанную дату. Отмеченные трудозатраты останутся."
          onCancel={() => this.setState({ isNewDateModalWindowHidden: true })}
          onConfirm={() =>
            this.saveTaskToDatabase({
              moved_date: getFormatDate(this.state.movedDate)
            })
          }
          isConfirmButtonDisabled={!!this.state.movedDate ? false : true}
        >
          <DatePickerButton
            date={this.state.movedDate}
            onChange={date => this.setState({ movedDate: date })}
            placeholderText="Новая дата задачи"
            width={146}
          />
        </ConfirmModalWindow>
      );
    }
  }

  /*
   * Рендер
   */

  render() {
    return (
      <div className={!!this.props.content.on_fire ? "task onFire" : "task"}>
        {this.getNewDateModalWindow()}
        {this.getDeleteModalWindow()}
        {this.getFullTaskAction()}
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
