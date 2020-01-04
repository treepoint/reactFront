import React from "react";
import Tasks from "./Tables/Tasks";
import TasksLog from "./Tables/TasksLog";
import DayPicker from "./DayPicker/DayPicker";
import {
  getUserTasksByDate,
  getTasksLogByDate,
  getAllTaskStatuses,
  getUserCategories
} from "../../../../APIController/APIController";

import { getCurrentFormatDate } from "../../../../Libs/TimeUtils";
import "./TasksManager.css";

/* В общем, у нас здесь какая идея. Есть N таблиц, связанных между собой.
 * Например, при добавлении новой задачи, она автоматически должна появится в логе выполнения задач,
 * чтобы её можно было выбрать для указания времени.
 *
 * Кроме того, одна таблицы может строится на данных из других таблиц. Таким образом,
 * каждая таблица должна уметь обновлять другие таблицы, уметь брать данные из других таблицы.
 * Поэтому данный контейнер хранит функции для обновления таблиц и сами листы с инфой.
 *
 * Если какой-то таблице нужна функция обновления другой или лист инфы — просто передаем его туда как пропсы.
 */

class TasksManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      tasksLogList: [],
      categoriesList: [],
      taskStatusesList: [],
      date: getCurrentFormatDate()
    };
  }

  componentDidMount() {
    this.updateData(this.state.date);
  }

  updateData(date) {
    this.getTasks(date);
    this.getUserCategories();
    this.getTasksLog(date);
    this.getAllTaskStatuses();
  }

  getTasks(date, callback) {
    getUserTasksByDate(date, result => {
      if (typeof callback === "function") {
        this.setState({ tasksList: result }, () => callback());
      } else {
        this.setState({ tasksList: result });
      }
    });
  }

  getTasksLog(date, callback) {
    getTasksLogByDate(date, result => {
      if (typeof callback === "function") {
        this.setState({ tasksLogList: result }, () => callback());
      } else {
        this.setState({ tasksLogList: result });
      }
    });
  }

  getUserCategories() {
    getUserCategories(result => {
      this.setState({ categoriesList: result });
    });
  }

  getAllTaskStatuses() {
    getAllTaskStatuses(result => {
      this.setState({ taskStatusesList: result });
    });
  }

  onPickDate(date) {
    this.setState({ date });

    this.updateData(date);
  }

  render() {
    return (
      <React.Fragment>
        <DayPicker onChange={date => this.onPickDate(date)} />
        <div className="taskContainer">
          {
            /*Таблица с задачами*/
            <Tasks
              getTasks={callback => this.getTasks(this.state.date, callback)}
              getTasksLog={callback =>
                this.getTasksLog(this.state.date, callback)
              }
              tasksList={this.state.tasksList}
              categoriesList={this.state.categoriesList}
              taskStatusesList={this.state.taskStatusesList}
            />
          }
          {/*Таблица с логом по задачам*/}
          <TasksLog
            getTasksLog={callback =>
              this.getTasksLog(this.state.date, callback)
            }
            getTasks={callback => this.getTasks(this.state.date, callback)}
            tasksList={this.state.tasksList}
            tasksLogList={this.state.tasksLogList}
            date={this.state.date}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TasksManager;
