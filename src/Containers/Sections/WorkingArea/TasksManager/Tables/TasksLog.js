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
      comment: "",
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
          value: "ID"
        },
        {
          key: "task_id",
          type: "string",
          disabled: true,
          value: "Задача",
          width: 574
        },
        {
          key: "execution_start",
          type: "string",
          disabled: true,
          value: "Старт",
          width: 80
        },
        {
          key: "execution_end",
          type: "string",
          disabled: true,
          value: "Стоп",
          width: 80
        },
        {
          key: "execution_time",
          type: "string",
          disabled: true,
          value: "Время",
          width: 80
        },
        {
          key: "comment",
          type: "string",
          disabled: true,
          value: "Комментарий",
          width: 250
        }
      ]
    ];

    this.props.tasksLogList.forEach(tasksLogList => {
      //Соберем список задач
      let tasksList = this.props.tasksList.map(task => {
        return {
          value: task.id,
          label: task.name,
          style: task.name_style
        };
      });

      //добавим текущую
      let tasks = {
        list: tasksList,
        current: tasksLogList.task_id
      };

      content.push([
        { key: "id", type: "hidden", value: tasksLogList.id, style: {} },
        {
          key: "task_id",
          type: "select",
          disabled: false,
          value: tasks
        },
        {
          key: "execution_start",
          type: "time",
          disabled: false,
          value: tasksLogList.execution_start
        },
        {
          key: "execution_end",
          type: "time",
          disabled: false,
          value: tasksLogList.execution_end
        },
        {
          key: "execution_time",
          type: "time",
          disabled: true,
          value: getTimeFromMins(tasksLogList.execution_time)
        },
        {
          key: "comment",
          type: "text",
          disabled: false,
          value: tasksLogList.comment
        }
      ]);
    });

    return content;
  }

  render() {
    return (
      <Table
        isEditable={true}
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
