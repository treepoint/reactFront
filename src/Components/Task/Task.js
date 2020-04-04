import React from "react";
//Redux
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../../Store/actions/tasks";
import { closeOpenedLogAndOpenNewOneByTaskId } from "../../Store/actions/tasksLog";
//Компоненты
import TextContent from "../TextContent/TextContent";
import SelectContent from "../SelectContent/SelectContent";
import TimeContent from "../TimeContent/TimeContent";
import ConfirmModalWindow from "../ConfirmModalWindow/ConfirmModalWindow";
import Spacer from "../Spacer/Spacer";
import Action from "../Action/Action";
import TaskModalWindow from "../TaskModalWindow/TaskModalWindow";
import DatePickerButton from "../DatePickerButton/DatePickerButton";
//Утилиты
import {
  getCurrentDateWithTimeFormat,
  getCurrentTimeFormat,
  getTimeFromMins,
  getFormatDate,
} from "../../Libs/TimeUtils";
//Картинки
import deleteIcon from "../../Images/icon_delete.png";
import completeIcon from "../../Images/icon_complete.png";
import inCompleteIcon from "../../Images/icon_incomplete.png";
import timeSpanIcon from "../../Images/icon_time_span.png";
import iconFire from "../../Images/icon_fire.png";
import iconFrozen from "../../Images/icon_frozen.png";
import iconFrozenBlue from "../../Images/icon_frozen_blue.png";
import iconFireRed from "../../Images/icon_fire_red.png";
import iconMenu from "../../Images/icon_menu.png";
import iconMore from "../../Images/icon_more.png";
import iconMoreFull from "../../Images/icon_more_full.png";
import iconNewDate from "../../Images/icon_new_date.png";
//CSS
import "./Task.css";

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      isDeleteModalWindowHidden: true,
      isNewDateModalWindowHidden: true,
      isTaskPageHidden: true,
      isMenuOpen: false,
      movedDate: null,
    };
  }

  componentDidUpdate(prevProps) {
    //Если при ререндере здесь оказалась другая задача — сбросим данные
    if (prevProps.content.id !== this.props.content.id) {
      this.setState({
        isTaskPageHidden: true,
        isDeleteModalWindowHidden: true,
        isNewDateModalWindowHidden: true,
        isMenuOpen: false,
        movedDate: null,
      });
    }
  }

  /*
   * Обработка данных
   */

  //Сохраним задачу в ДБ
  saveTaskToDatabase(diff) {
    let task = {
      id: this.props.content.id,
      name: this.props.content.name,
      description: this.props.content.description,
      category_id: this.props.content.categories.current,
      execution_time_day: this.props.content.execution_time_day,
      execution_time_all: this.props.content.execution_time_all,
      frozen: this.props.content.frozen,
      on_fire: this.props.content.on_fire,
      closed_date: this.props.content.closed_date,
      update_date: this.props.date + " " + getCurrentTimeFormat(),
      moved_date: this.props.content.moved_date,
    };

    //Склеим объект и разницу
    Object.assign(task, diff);

    this.props.updateTask(task, this.props.date);
  }

  /*
   * В чем прикол функций ниже. Если модалки с данными по задаче не
   * скрыты перед её переносом — пытаются произвестись операции по ним.
   * Поэтому сначала скрываем, потом делаем операцию. Иначе будет ошибка
   */

  //Скрыть все модалки и удалить таску
  deleteTask() {
    this.setState(
      { isTaskPageHidden: true, isNewDateModalWindowHidden: true },
      this.props.deleteTask(this.props.content.id)
    );
  }

  //Скрыть все модалки и переместить таску
  moveTask() {
    this.setState(
      { isTaskPageHidden: true, isDeleteModalWindowHidden: true },
      this.saveTaskToDatabase({
        moved_date: getFormatDate(this.state.movedDate),
      })
    );
  }

  //Скрыть все модалки и выполнить
  completeTask(state) {
    let closed_date = null;

    if (state === 1) {
      closed_date = getCurrentDateWithTimeFormat();
    }

    this.setState(
      {
        isTaskPageHidden: true,
        isDeleteModalWindowHidden: true,
        isNewDateModalWindowHidden: true,
      },
      this.saveTaskToDatabase({
        closed_date: closed_date,
      })
    );
  }

  /*
   * Отрисовка данных
   */

  //Название задачи
  getTaskName() {
    return (
      <div className="textField">
        <TextContent
          value={this.props.content.name}
          width={249}
          height={68}
          isStylable={false}
          //Функции
          onChangeValue={(value) => this.saveTaskToDatabase({ name: value })}
        />
      </div>
    );
  }

  //Категория задачи
  getCategorySelect() {
    return (
      <div className="selectField">
        <SelectContent
          isMinimized={true}
          value={this.props.content.categories}
          height={34}
          onChangeValue={(category) =>
            this.saveTaskToDatabase({ category_id: category.current })
          }
        />
      </div>
    );
  }

  //Время выполнения задачи
  getExecutionTimeAll() {
    return (
      <div className="timeField">
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
  getNewDateAction(lable, style, isNotTransparent) {
    return (
      <Action
        style={!!style ? style : { marginLeft: "6px" }}
        lable={lable}
        isTransparent={!!isNotTransparent ? false : true}
        icon={iconNewDate}
        hint="Перенести"
        onClick={() => this.setState({ isNewDateModalWindowHidden: false })}
      />
    );
  }

  getOnFireAction(lable, style, isNotTransparent) {
    return (
      <div className={!!this.state.isOnFire ? "flicker" : null}>
        <Action
          style={!!style ? style : { marginLeft: "6px" }}
          lable={lable}
          isTransparent={
            !!this.props.content.on_fire
              ? false
              : !!isNotTransparent
              ? false
              : true
          }
          icon={!!this.props.content.on_fire ? iconFireRed : iconFire}
          hint="В огне!"
          onClick={() =>
            this.saveTaskToDatabase({ on_fire: !this.props.content.on_fire })
          }
        />
      </div>
    );
  }

  getFrozenAction(lable, style, isNotTransparent) {
    return (
      <Action
        style={!!style ? style : { marginLeft: "6px" }}
        lable={lable}
        isTransparent={
          !!this.props.content.frozen
            ? false
            : !!isNotTransparent
            ? false
            : true
        }
        icon={!!this.props.content.frozen ? iconFrozenBlue : iconFrozen}
        hint="Заморозить"
        onClick={() =>
          this.saveTaskToDatabase({ frozen: !this.props.content.frozen })
        }
      />
    );
  }

  getDeleteTaskAction(lable, style, isNotTransparent) {
    return (
      <Action
        style={!!style ? style : { marginLeft: "6px" }}
        lable={lable}
        isTransparent={!!isNotTransparent ? false : true}
        icon={deleteIcon}
        hint="Удалить задачу"
        onClick={() => this.setState({ isDeleteModalWindowHidden: false })}
      />
    );
  }

  getTimeSpanAction(lable, style, isNotTransparent) {
    return (
      <Action
        style={!!style ? style : { marginLeft: "6px" }}
        lable={lable}
        isTransparent={!!isNotTransparent ? false : true}
        hint="Учесть время"
        icon={timeSpanIcon}
        onClick={() =>
          this.props.closeOpenedLogAndOpenNewOneByTaskId(
            this.props.content.id,
            this.props.date
          )
        }
      />
    );
  }

  getCompleteActions(lable, style, isNotTransparent) {
    return (
      <React.Fragment>
        {!!this.props.content.closed_date ? (
          <div className="taskMenuItem">
            <Action
              style={!!style ? style : { marginLeft: "6px" }}
              lable={lable}
              isTransparent={!!isNotTransparent ? false : true}
              icon={inCompleteIcon}
              hint="Вернуть задачу"
              onClick={() => this.completeTask(0)}
            />
          </div>
        ) : (
          <div className="taskMenuItem">
            <Action
              style={!!style ? style : { marginLeft: "6px" }}
              lable={lable}
              isTransparent={!!isNotTransparent ? false : true}
              icon={completeIcon}
              hint="Выполнить задачу"
              onClick={() => this.completeTask(1)}
            />
          </div>
        )}
      </React.Fragment>
    );
  }

  getTaskMenuAction() {
    return (
      <div className="taskMenuActionContainer">
        <Action
          isTransparent
          icon={iconMenu}
          hint="Все действия"
          onClick={() => this.setState({ isMenuOpen: !this.state.isMenuOpen })}
        />
      </div>
    );
  }

  getFullTaskAction() {
    return (
      <Action
        style={{
          height: "10px",
          paddingBottom: "9px",
          marginTop: "-7px",
          marginRight: "-4px",
        }}
        isTransparent={true}
        hint="Расширенное описание"
        icon={!!this.props.content.description ? iconMoreFull : iconMore}
        onClick={() => this.setState({ isTaskPageHidden: false })}
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
    return !!!this.props.content.closed_date ? (
      <div className="taskActions">
        {!!this.props.content.closed_date
          ? this.getDeleteTaskAction()
          : this.getTimeSpanAction()}
      </div>
    ) : (
      <div className="taskActions">{this.getCompleteActions()}</div>
    );
  }

  //Все действия таска
  getAllTaskActions() {
    return !!this.props.content.closed_date ? (
      //Для архивной таски
      <div className="taskActions">
        {this.getOnFireAction()}
        {this.getFrozenAction()}
        {this.getDeleteTaskAction()}
        {this.getCompleteActions()}
      </div>
    ) : (
      //Для обычной таски
      <div className="taskActions">
        {this.getCompleteActions()}
        {this.getOnFireAction()}
        {this.getFrozenAction()}
        {this.getNewDateAction()}
        {this.getTimeSpanAction()}
      </div>
    );
  }

  /*
   * Опциональная часть
   */

  getOptionalPart() {
    return (
      <div className="optionalPart">
        {/*Данные*/}
        {this.getCategorySelect()}
        <div className="executionTime">{this.getExecutionTimeAll()}</div>
        <Spacer />
        {/*Кнопки*/}
        {!!this.state.isMenuOpen ? (
          //Все
          <div
            className="taskMenu"
            onClick={() => {
              this.setState({ isMenuOpen: false });
            }}
          >
            {this.getAllTaskActions()}
          </div>
        ) : (
          //Только важные
          <React.Fragment>
            {this.getTaskMarksAction()}
            {this.getShortActions()}
          </React.Fragment>
        )}
        {/*Кнопка меню*/}
        {this.getTaskMenuAction()}
      </div>
    );
  }

  /*
   * Отметки задачи
   */
  getTaskMarksAction() {
    return (
      <div className="taskMarks">
        {!!this.props.content.on_fire ? this.getOnFireAction() : ""}
        {!!this.props.content.frozen ? this.getFrozenAction() : ""}
      </div>
    );
  }

  /*
   * Подробности по задаче
   */

  getCurrentModalWindow() {
    // Модалка для удаления
    if (!this.state.isDeleteModalWindowHidden) {
      return this.getDeleteModalWindow();
    }

    //Модалка для переноса задачи на другую дату
    if (!this.state.isNewDateModalWindowHidden) {
      return this.getNewDateModalWindow();
    }

    //Модалка с подробностями по задаче
    if (!this.state.isTaskPageHidden) {
      return this.getTaskPageModalWindow();
    }
  }

  //Само модальное окно с подробностями
  getTaskPageModalWindow() {
    return (
      <TaskModalWindow
        //Контент
        content={this.props.content}
        //Основные функции
        onCancel={() => this.setState({ isTaskPageHidden: true })}
        //Для обратки изменений
        saveTaskToDatabase={(diff) => this.saveTaskToDatabase(diff)}
        updateTask={(task) => this.props.updateTask(task, this.props.date)}
        deleteTask={() => this.props.deleteTask(this.props.content.id)}
        createTaskLog={() =>
          this.props.createTaskLog(this.props.content.id, this.props.date)
        }
        archiveTask={(state) => this.completeTask(state)}
        //Для обработки модалок
        showDeleteModalWindow={() =>
          this.setState({ isDeleteModalWindowHidden: false })
        }
        showNewDateModalWindow={() =>
          this.setState({ isNewDateModalWindowHidden: false })
        }
        //Экшены
        getNewDateAction={(lable, style, isNotTransparent) =>
          this.getNewDateAction(lable, style, isNotTransparent)
        }
        getOnFireAction={(lable, style, isNotTransparent) =>
          this.getOnFireAction(lable, style, isNotTransparent)
        }
        getFrozenAction={(lable, style, isNotTransparent) =>
          this.getFrozenAction(lable, style, isNotTransparent)
        }
        getDeleteTaskAction={(lable, style, isNotTransparent) =>
          this.getDeleteTaskAction(lable, style, isNotTransparent)
        }
        getTimeSpanAction={(lable, style, isNotTransparent) =>
          this.getTimeSpanAction(lable, style, isNotTransparent)
        }
        getCompleteActions={(lable, style, isNotTransparent) =>
          this.getCompleteActions(lable, style, isNotTransparent)
        }
      />
    );
  }

  /*
   * Модалка для удаления
   */
  getDeleteModalWindow() {
    return (
      <ConfirmModalWindow
        title="Удалить задачу?"
        message="Вместе с задачей будут удалены все записи из лога и статистики. 
                   Если вы хотите закрыть задачу — проставьте у неё статус с типом «Окончательный»."
        onCancel={() => this.setState({ isDeleteModalWindowHidden: true })}
        onConfirm={() => this.deleteTask()}
      />
    );
  }

  /*
   * Модалка для переноса задачи на другую дату
   */
  getNewDateModalWindow() {
    return (
      <ConfirmModalWindow
        title="Перенести задачу на другую дату?"
        message="Задача будет перемещена на указанную дату. Отмеченные трудозатраты останутся."
        onCancel={() => this.setState({ isNewDateModalWindowHidden: true })}
        onConfirm={() => this.moveTask()}
        isConfirmButtonDisabled={!!this.state.movedDate ? false : true}
      >
        <div className="moveDatePicker">
          <DatePickerButton
            date={this.state.movedDate}
            onChange={(date) => this.setState({ movedDate: date })}
            placeholderText="Новая дата задачи"
            width={146}
          />
        </div>
      </ConfirmModalWindow>
    );
  }

  /*
   * Рендер
   */

  render() {
    return (
      <React.Fragment>
        {this.getCurrentModalWindow()}
        <div
          className={
            "task" +
            (!!this.props.content.on_fire ? " onFire" : "") +
            (!!this.props.content.frozen ? " frozen" : "")
          }
        >
          {this.getFullTaskAction()}
          {this.getTaskName()}
          {this.getOptionalPart()}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (task, forDate) => {
      dispatch(updateTask(task, forDate));
    },
    deleteTask: (id) => {
      dispatch(deleteTask(id));
    },
    closeOpenedLogAndOpenNewOneByTaskId: (taskId, date) => {
      dispatch(closeOpenedLogAndOpenNewOneByTaskId(taskId, date));
    },
  };
};

export default connect(null, mapDispatchToProps)(Task);
