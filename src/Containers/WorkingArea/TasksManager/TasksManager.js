import React from "react";
import Tasks from "./Tables/Tasks";
import TasksLog from "./Tables/TasksLog";
import TasksStatistic from "./Tables/TasksStatistic";
import DayPicker from "./DayPicker/DayPicker";
import {
  getUserTasks,
  getTasksLog,
  getAllTaskStatuses,
  getUserCategories,
  getTimeExecutionForAllCategories
} from "../../../APIController/APIController";
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
      categoriesExecutionTimeList: []
    };
  }

  componentDidMount() {
    this.getTasks();
    this.getUserCategories();
    this.getTasksLog();
    this.getAllTaskStatuses();
    this.getTimeExecutionForAllCategories();
  }

  getTasks(callback) {
    this.getRowData(getUserTasks, "tasksList", callback);
  }

  getUserCategories(callback) {
    this.getRowData(getUserCategories, "categoriesList", callback);
  }

  getAllTaskStatuses(callback) {
    this.getRowData(getAllTaskStatuses, "taskStatusesList", callback);
  }

  getTasksLog(callback) {
    this.getRowData(getTasksLog, "tasksLogList", callback);
  }

  getTimeExecutionForAllCategories(callback) {
    this.getRowData(
      getTimeExecutionForAllCategories,
      "categoriesExecutionTimeList",
      callback
    );
  }

  getRowData(updateFunction, list, callback) {
    let promise = updateFunction();

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ [list]: result }, () => callback());
        } else {
          this.setState({ [list]: result });
        }
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <DayPicker />
        <div className="taskContainer">
          {
            /*Таблица с задачами*/
            <Tasks
              getTasks={callback => this.getTasks(callback)}
              getTasksLog={callback => this.getTasksLog(callback)}
              getTimeExecutionForAllCategories={callback =>
                this.getTimeExecutionForAllCategories(callback)
              }
              tasksList={this.state.tasksList}
              categoriesList={this.state.categoriesList}
              taskStatusesList={this.state.taskStatusesList}
            />
          }

          {/*Таблица со статистикой по задачам*/}
          <TasksStatistic
            categoriesExecutionTimeList={this.state.categoriesExecutionTimeList}
          />

          {/*Таблица с логом по задачам*/}
          <TasksLog
            getTasksLog={callback => this.getTasksLog(callback)}
            getTimeExecutionForAllCategories={callback =>
              this.getTimeExecutionForAllCategories(callback)
            }
            tasksList={this.state.tasksList}
            tasksLogList={this.state.tasksLogList}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TasksManager;
