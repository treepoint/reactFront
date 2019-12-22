import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import {
  getUserTasks,
  getUserCategories,
  getTasksLog,
  getAllTaskStatuses
} from "../../APIController/APIController";

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
      { key: "id", type: "text", value: "ID", style: { width: 30 } },
      { key: "name", type: "text", value: "Название", style: { width: 200 } },
      {
        key: "description",
        type: "text",
        value: "Описание",
        style: { width: 220 }
      },
      {
        key: "category_name",
        type: "text",
        value: "Категория",
        style: { width: 120 }
      },
      {
        key: "status_name",
        type: "text",
        value: "Статус",
        style: { width: 120 }
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
        { key: "id", type: "text", value: task.id, style: {} },
        { key: "name", type: "text", value: task.name, style: {} },
        {
          key: "description",
          type: "text",
          value: task.description,
          style: {}
        },
        {
          key: "category_id",
          type: "select",
          value: categories,
          style: {}
        },
        { key: "status_id", type: "select", value: statuses, style: {} }
      ]);
    });

    return tasks;
  }

  //Соберем таблицу для статистики по категориям задач
  getTasksStatisticTableContent() {
    let tasksStatistic = [];

    tasksStatistic[0] = [
      { value: "Категория", type: "text", style: { width: 120 } },
      { value: "Затрачено времени", type: "text", style: { width: 164 } }
    ];

    this.state.categoriesList.forEach(categoriesList => {
      tasksStatistic.push([
        { value: categoriesList.name, type: "text", style: {} },
        { value: "0", type: "text", style: {} }
      ]);
    });

    return tasksStatistic;
  }

  //Соберем таблицу для отображения лога по задачам
  getTasksLogTableContent() {
    let tasksLog = [];
    tasksLog[0] = [
      { key: "id", type: "text", value: "ID", style: { width: 30 } },
      {
        key: "task_name",
        type: "text",
        value: "Название задачи",
        style: { width: 220 }
      },
      {
        key: "execution_start",
        type: "text",
        value: "Начал",
        style: { width: 120 }
      },
      {
        key: "execution_end",
        type: "text",
        value: "Закончил",
        style: { width: 120 }
      },
      {
        key: "execution_time",
        type: "text",
        value: "Время выполнения",
        style: { width: 164 }
      }
    ];

    this.state.tasksLogList.forEach(tasksLogList => {
      tasksLog.push([
        { key: "id", type: "text", value: tasksLogList.id, style: {} },
        {
          key: "task_name",
          type: "text",
          value: tasksLogList.task_name,
          style: {}
        },
        {
          key: "execution_start",
          type: "text",
          value: tasksLogList.execution_start,
          style: {}
        },
        {
          key: "execution_end",
          type: "text",
          value: tasksLogList.execution_end,
          style: {}
        },
        {
          key: "execution_time",
          type: "text",
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
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ verticalAlign: "top", width: "70%" }}>
              {/*Таблица с задачами*/}
              <Table isEditable={true} isResizeble={true} isStylable={true}>
                {this.getTasksTableContent()}
              </Table>
            </td>
            <td style={{ verticalAlign: "top", width: "30%" }}>
              {/*Таблица со статистикой по задачам*/}
              <Table isEditable={false} isResizeble={true}>
                {this.getTasksStatisticTableContent()}
              </Table>
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "top", width: "100%" }} colspan="2">
              {/*Таблица с логом по задачам*/}
              <Table isEditable={false} isResizeble={true}>
                {this.getTasksLogTableContent()}
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
