import React from "react";
import Table from "../../../../../Components/Table/Table";
import {
  getTimeFromMins,
  getCurrentTimeFormat
} from "../../../../../Libs/TimeUtils";
import {
  updateTaskLog,
  createTaskLog,
  deleteTaskLog
} from "../../../../../APIController/APIController";

class TasksLog extends React.Component {
  //Добавим лог по задаче в ДБ
  addRowToDataBase() {
    let taskLog = {
      task_id: this.props.tasksList[0].id,
      execution_start: this.props.date + " " + getCurrentTimeFormat(),
      execution_end: this.props.date
    };

    createTaskLog(taskLog, ok => {
      if (ok) {
        this.props.getTasksLog();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(taskLog, callback) {
    updateTaskLog(taskLog, ok => {
      if (ok) {
        this.props.getTasksLog(callback);
        this.props.getTasks();
      }
    });
  }

  //Удалим лог по задаче из ДБ
  deleteRowFromDataBase(taskLog) {
    deleteTaskLog(taskLog.id, ok => {
      if (ok) {
        this.props.getTasksLog();
        this.props.getTasks();
      }
    });
  }

  //Соберем таблицу для отображения лога по задачам
  getContent() {
    let content = [
      [
        {
          key: "id",
          type: "hidden",
          disabled: true,
          value: "ID",
          style: {}
        },
        {
          key: "task_id",
          type: "string",
          disabled: true,
          value: "Задача",
          style: { width: 342 }
        },
        {
          key: "execution_start",
          type: "string",
          disabled: true,
          value: "Старт",
          style: { width: 120 }
        },
        {
          key: "execution_end",
          type: "string",
          disabled: true,
          value: "Стоп",
          style: { width: 120 }
        },
        {
          key: "execution_time",
          type: "string",
          disabled: true,
          value: "Время",
          style: { width: 120 }
        }
      ]
    ];

    this.props.tasksLogList.forEach(tasksLogList => {
      //Соберем список задач
      let tasksList = this.props.tasksList.map(task => {
        return { value: task.id, children: task.name };
      });

      //добавим текущую
      let tasks = { list: tasksList, current: tasksLogList.task_id };

      content.push([
        { key: "id", type: "hidden", value: tasksLogList.id, style: {} },
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

    return content;
  }

  render() {
    return (
      <Table
        isEditable={false}
        isResizeble={true}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        update={() => this.props.getTasksLog()}
        addRow={() => this.addRowToDataBase()}
        deleteRow={row => this.deleteRowFromDataBase(row)}
      >
        {this.getContent()}
      </Table>
    );
  }
}

export default TasksLog;
