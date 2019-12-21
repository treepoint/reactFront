import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import {
  getUserTasks,
  getUserCategories,
  getTasksLog
} from "../../APIController/APIController";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasksList: [], categoriesList: [], tasksLogList: [] };
  }

  componentDidMount() {
    this.getTasks();
    this.getUserCategories();
    this.getTasksLog();
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
  }

  //Преобразуем минуты в читаемый вид
  getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч. " + minutes + "м.";
  }

  render() {
    //Соберем таблицу для отображения задач
    let tasks = [];
    tasks[0] = [
      { key: "id", value: "ID", style: { width: 30 } },
      { key: "name", value: "Название", style: { width: 200 } },
      { key: "description", value: "Описание", style: { width: 220 } },
      { key: "category_name", value: "Категория", style: { width: 120 } },
      { key: "status_name", value: "Статус", style: { width: 120 } }
    ];

    this.state.tasksList.forEach(task => {
      tasks.push([
        { key: "id", value: task.id, style: {} },
        { key: "name", value: task.name, style: {} },
        { key: "description", value: task.description, style: {} },
        { key: "category_name", value: task.category_name, style: {} },
        { key: "status_name", value: task.status_name, style: {} }
      ]);
    });

    //Соберем таблицу для статистики по категориям задач
    let tasksStatistic = [];
    tasksStatistic[0] = [
      { value: "Категория", style: { width: 120 } },
      { value: "Затрачено времени", style: { width: 164 } }
    ];

    this.state.categoriesList.forEach(categoriesList => {
      tasksStatistic.push([
        { value: categoriesList.name, style: {} },
        { value: "0", style: {} }
      ]);
    });

    //Соберем таблицу для отображения лога по задачам
    let tasksLog = [];
    tasksLog[0] = [
      { key: "id", value: "ID", style: { width: 30 } },
      { key: "task_name", value: "Название задачи", style: { width: 220 } },
      { key: "execution_start", value: "Начал", style: { width: 120 } },
      { key: "execution_end", value: "Закончил", style: { width: 120 } },
      { key: "execution_time", style: { width: 164 } }
    ];

    this.state.tasksLogList.forEach(tasksLogList => {
      tasksLog.push([
        { key: "id", value: tasksLogList.id, style: {} },
        { key: "task_name", value: tasksLogList.task_name, style: {} },
        {
          key: "execution_start",
          value: tasksLogList.execution_start,
          style: {}
        },
        { key: "execution_end", value: tasksLogList.execution_end, style: {} },
        {
          key: "execution_time",
          value: this.getTimeFromMins(tasksLogList.execution_time),
          style: {}
        }
      ]);
    });

    return (
      <div>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ verticalAlign: "top", width: "70%" }}>
              {/*Таблица с задачами*/}
              <Table isEditable={true} isResizeble={true} isStylable={true}>
                {tasks}
              </Table>
            </td>
            <td style={{ verticalAlign: "top", width: "30%" }}>
              {/*Таблица со статистикой по задачам*/}
              <Table isEditable={false} isResizeble={true}>
                {tasksStatistic}
              </Table>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top", width: "100%" }} colspan="2">
              {/*Таблица с логом по задачам*/}
              <Table isEditable={false} isResizeble={true}>
                {tasksLog}
              </Table>
            </td>
          </tr>
        </table>
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
