import React from "react";
import Table from "../../Components/Table/Table";
import {
  getUserTasks,
  updateTask,
  createTask,
  deleteTask,
  getTasksLog,
  updateTaskLog,
  createTaskLog,
  deleteTaskLog,
  getAllTaskStatuses,
  getUserCategories,
  getTimeExecutionForAllCategories
} from "../../APIController/APIController";
import "./Tasks.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      categoriesList: [],
      tasksLogList: [],
      taskStatusesList: [],
      categoriesExecutionTimeList: []
    };
  }

  componentDidMount() {
    this.updateData();
  }

  getTasks() {
    let promise = getUserTasks();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ tasksList: result });
      }
    });
  }

  getUserCategories() {
    let promise = getUserCategories();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ categoriesList: result });
      }
    });
  }

  getAllTaskStatuses() {
    let promise = getAllTaskStatuses();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ taskStatusesList: result });
      }
    });
  }

  getTasksLog() {
    let promise = getTasksLog();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ tasksLogList: result });
      }
    });
  }

  getTimeExecutionForAllCategories() {
    let promise = getTimeExecutionForAllCategories();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ categoriesExecutionTimeList: result });
      }
    });
  }

  updateData() {
    this.getTasks();
    this.getUserCategories();
    this.getTasksLog();
    this.getAllTaskStatuses();
    this.getTimeExecutionForAllCategories();
  }

  //Преобразуем минуты в читаемый вид
  getTimeFromMins(mins) {
    if (mins < 0) {
      return "--:--";
    }

    if (mins === null) {
      return "00:00";
    } else {
      let hours = Math.trunc(mins / 60);
      let minutes = mins % 60;

      if (minutes <= 9) {
        minutes = "0" + minutes;
      }

      if (hours <= 9) {
        hours = "0" + hours;
      }

      return hours + ":" + minutes;
    }
  }

  //Соберем таблицу для отображения задач
  getTasksTableContent() {
    let tasks = [];
    tasks[0] = [
      {
        key: "id",
        type: "string",
        disabled: true,
        value: "ID",
        style: { width: 30 }
      },
      {
        key: "name",
        type: "string",
        disabled: true,
        value: "Название",
        style: { width: 200 }
      },
      {
        key: "description",
        type: "string",
        disabled: true,
        value: "Описание",
        style: { width: 220 }
      },
      {
        key: "category_name",
        type: "string",
        disabled: true,
        value: "Категория",
        style: { width: 120 }
      },
      {
        key: "status_name",
        type: "string",
        disabled: true,
        value: "Статус",
        style: { width: 200 }
      }
    ];

    this.state.tasksList.forEach(task => {
      //Соберем список категорий
      let categoriesList = this.state.categoriesList.map(category => {
        return { value: category.id, children: category.name };
      });

      //добавим текущую
      let categories = { list: categoriesList, current: task.category_id };

      //Соберем список статусов
      let statusesList = this.state.taskStatusesList.map(status => {
        return { value: status.id, children: status.name };
      });

      //добавим текущий
      let statuses = { list: statusesList, current: task.status_id };

      tasks.push([
        {
          key: "id",
          type: "string",
          disabled: true,
          value: task.id,
          style: {}
        },
        {
          key: "name",
          type: "text",
          disabled: false,
          value: task.name,
          style: {}
        },
        {
          key: "description",
          type: "text",
          disabled: false,
          value: task.description,
          style: {}
        },
        {
          key: "category_id",
          type: "select",
          disabled: false,
          value: categories,
          style: {}
        },
        {
          key: "status_id",
          type: "select",
          disabled: false,
          value: statuses,
          style: {}
        }
      ]);
    });

    return tasks;
  }

  //Сохраним изменяемую строку в ДБ
  saveTaskToDataBase(task, callback) {
    let promise = updateTask(task.id, task);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getTasks();
        this.getTimeExecutionForAllCategories();
        callback();
      }
    });
  }

  //Добавим лог по задаче в ДБ
  addTaskLogToDataBase() {
    //Получим сегодняшную дату
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    var time = today.getHours() + "-" + today.getMinutes();

    today = yyyy + "-" + mm + "-" + dd;

    let now = today + " " + time;

    let promise = createTaskLog({
      task_id: this.state.tasksList[0].id,
      execution_start: now,
      execution_end: today
    });

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getTasksLog();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveTaskLogToDataBase(taskLog, callback) {
    let promise = updateTaskLog(taskLog.id, taskLog);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getTasksLog();
        this.getTimeExecutionForAllCategories();
        callback();
      }
    });
  }

  //Удалим лог по задаче из ДБ
  deleteTaskLogFromDataBase(taskLog) {
    let promise = deleteTaskLog(taskLog.id);

    promise.then(result => {
      if (result === "{success}") {
        this.getTasksLog();
        this.getTimeExecutionForAllCategories();
      }
    });
  }

  //Сохраним задачу в ДБ
  addTaskToDataBase() {
    let task = {
      category_id: this.state.categoriesList[0].id,
      status_id: this.state.taskStatusesList[0].id,
      name: "<br>",
      description: "<br>"
    };

    let promise = createTask(task);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getTasks();
        this.getTasksLog();
      }
    });
  }

  //Удалим задачу из ДБ
  deleteTaskFromDataBase(task) {
    let promise = deleteTask(task.id);

    promise.then(result => {
      if (result === "{success}") {
        this.getTasks();
        this.getTasksLog();
        this.getTimeExecutionForAllCategories();
      }
    });
  }

  //Соберем таблицу для статистики по категориям задач
  getTasksStatisticTableContent() {
    let tasksStatistic = [];

    tasksStatistic[0] = [
      {
        value: "Категория",
        type: "string",
        disabled: true,
        style: { width: 120 }
      },
      {
        value: "Затрачено времени",
        type: "string",
        disabled: true,
        style: { width: 164 }
      }
    ];

    this.state.categoriesExecutionTimeList.forEach(category => {
      tasksStatistic.push([
        { value: category.name, type: "text", disabled: true, style: {} },
        {
          value: this.getTimeFromMins(category.execution_time),
          type: "time",
          disabled: true,
          style: {}
        }
      ]);
    });

    return tasksStatistic;
  }

  //Соберем таблицу для отображения лога по задачам
  getTasksLogTableContent() {
    let tasksLog = [];
    tasksLog[0] = [
      {
        key: "id",
        type: "string",
        disabled: true,
        value: "ID",
        style: { width: 30 }
      },
      {
        key: "task_id",
        type: "string",
        disabled: true,
        value: "Название задачи",
        style: { width: 336 }
      },
      {
        key: "execution_start",
        type: "string",
        disabled: true,
        value: "Начал",
        style: { width: 120 }
      },
      {
        key: "execution_end",
        type: "string",
        disabled: true,
        value: "Закончил",
        style: { width: 120 }
      },
      {
        key: "execution_time",
        type: "string",
        disabled: true,
        value: "Время выполнения",
        style: { width: 164 }
      }
    ];

    this.state.tasksLogList.forEach(tasksLogList => {
      //Соберем список задач
      let tasksList = this.state.tasksList.map(task => {
        return { value: task.id, children: task.name };
      });

      //добавим текущую
      let tasks = { list: tasksList, current: tasksLogList.task_id };

      tasksLog.push([
        { key: "id", type: "string", value: tasksLogList.id, style: {} },
        {
          key: "task_id",
          type: "select",
          disabled: false,
          value: tasks,
          style: {}
        },
        {
          key: "execution_start",
          type: "time",
          disabled: false,
          value: tasksLogList.execution_start,
          style: {}
        },
        {
          key: "execution_end",
          type: "time",
          disabled: false,
          value: tasksLogList.execution_end,
          style: {}
        },
        {
          key: "execution_time",
          type: "time",
          disabled: true,
          value: this.getTimeFromMins(tasksLogList.execution_time),
          style: {}
        }
      ]);
    });

    return tasksLog;
  }

  render() {
    return (
      <div>
        <div className="taskContainer">
          <div>
            {/*Таблица с задачами*/}
            <Table
              isEditable={true}
              isResizeble={true}
              isStylable={true}
              saveRowToDataBase={(row, callback) =>
                this.saveTaskToDataBase(row, callback)
              }
              updateTableContent={() => this.getTasks()}
              addRowToDataBase={() => this.addTaskToDataBase()}
              deleteRowFromDataBase={row => this.deleteTaskFromDataBase(row)}
            >
              {this.getTasksTableContent()}
            </Table>
          </div>
          <div className="tasksStatisctic">
            {/*Таблица со статистикой по задачам*/}
            <Table isEditable={false} isResizeble={true}>
              {this.getTasksStatisticTableContent()}
            </Table>
          </div>
        </div>
        {/*Таблица с логом по задачам*/}
        <Table
          isEditable={false}
          isResizeble={true}
          saveRowToDataBase={(row, callback) =>
            this.saveTaskLogToDataBase(row, callback)
          }
          updateTableContent={() => this.getTasksLog()}
          addRowToDataBase={() => this.addTaskLogToDataBase()}
          deleteRowFromDataBase={row => this.deleteTaskLogFromDataBase(row)}
        >
          {this.getTasksLogTableContent()}
        </Table>
      </div>
    );
  }
}

export default Tasks;
