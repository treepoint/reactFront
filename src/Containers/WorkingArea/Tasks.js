import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import {
  getUserTasks,
  getUserCategories,
  getTasksLog,
  getAllTaskStatuses,
  updateTask,
  createTask,
  deleteTask
} from "../../APIController/APIController";
import "./Tasks.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      categoriesList: [],
      tasksLogList: [],
      taskStatusesList: []
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

  updateData() {
    this.getTasks();
    this.getUserCategories();
    this.getTasksLog();
    this.getAllTaskStatuses();
  }

  //Преобразуем минуты в читаемый вид
  getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + ":" + minutes;
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
    updateTask(task.id, task);

    //Пока, если просто дошли до сюда, значит сохранили.
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  //Сохраним изменяемую строку в ДБ
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
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  deleteTaskFromDataBase(task) {
    let promise = deleteTask(task.id);

    promise.then(result => {
      if (result === "{success}") {
        this.getTasks();
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

    this.state.categoriesList.forEach(categoriesList => {
      tasksStatistic.push([
        { value: categoriesList.name, type: "text", disabled: true, style: {} },
        { value: "0", type: "text", disabled: true, style: {} }
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
        key: "task_name",
        type: "string",
        disabled: true,
        value: "Название задачи",
        style: { width: 220 }
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
      tasksLog.push([
        { key: "id", type: "string", value: tasksLogList.id, style: {} },
        {
          key: "task_name",
          type: "text",
          disabled: true,
          value: tasksLogList.task_name,
          style: {}
        },
        {
          key: "execution_start",
          type: "string",
          disabled: false,
          value: tasksLogList.execution_start,
          style: {}
        },
        {
          key: "execution_end",
          type: "string",
          disabled: false,
          value: tasksLogList.execution_end,
          style: {}
        },
        {
          key: "execution_time",
          type: "string",
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
          updateTableContent={() => this.getTasksLog()}
        >
          {this.getTasksLogTableContent()}
        </Table>

        <Button
          value="Обновить данные по задачам"
          isPrimary={true}
          onClick={() => this.updateData()}
        />
      </div>
    );
  }
}

export default Tasks;
