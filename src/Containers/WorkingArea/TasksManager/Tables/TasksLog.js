import React from "react";
import Table from "../../../../Components/Table/Table";
import { getTimeFromMins } from "./UTILS";
import {
  updateTaskLog,
  createTaskLog,
  deleteTaskLog
} from "../../../../APIController/APIController";

class TasksLog extends React.Component {
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
        this.props.getTasksLog();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveTaskLogToDataBase(taskLog, callback) {
    let promise = updateTaskLog(taskLog.id, taskLog);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.props.getTasksLog(callback);
        this.props.getTimeExecutionForAllCategories();
      }
    });
  }

  //Удалим лог по задаче из ДБ
  deleteTaskLogFromDataBase(taskLog) {
    let promise = deleteTaskLog(taskLog.id);

    promise.then(result => {
      if (result === "{success}") {
        this.props.getTasksLog();
        this.props.getTimeExecutionForAllCategories();
      }
    });
  }

  //Соберем таблицу для отображения лога по задачам
  getContent() {
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

    this.props.tasksLogList.forEach(tasksLogList => {
      //Соберем список задач
      let tasksList = this.props.tasksList.map(task => {
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
          value: getTimeFromMins(tasksLogList.execution_time),
          style: {}
        }
      ]);
    });

    return tasksLog;
  }

  render() {
    return (
      <div>
        {/*Таблица с логом по задачам*/}
        <Table
          isEditable={false}
          isResizeble={true}
          saveRow={(row, callback) => this.saveTaskLogToDataBase(row, callback)}
          update={() => this.props.getTasksLog()}
          addRow={() => this.addTaskLogToDataBase()}
          deleteRow={row => this.deleteTaskLogFromDataBase(row)}
        >
          {this.getContent()}
        </Table>
      </div>
    );
  }
}

export default TasksLog;
