import React from "react";
import Table from "../../../../../Components/Table/Table";
import {
  updateTask,
  createTask,
  deleteTask
} from "../../../../../APIController/APIController";
import {
  getTimeFromMins,
  getCurrentFormatDate
} from "../../../../../Libs/TimeUtils";

class Tasks extends React.Component {
  //Сохраним задачу в ДБ
  addRowToDataBase() {
    let task = {
      category_id: this.props.categoriesList[0].id,
      status_id: this.props.taskStatusesList[0].id,
      name: "",
      description: "<br>",
      create_date: getCurrentFormatDate()
    };

    createTask(task, ok => {
      if (ok) {
        this.props.getTasks();
        this.props.getTasksLog();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(task, callback) {
    updateTask(task, ok => {
      if (ok) {
        this.props.getTasks(callback);
        this.props.getTasksLog();
      }
    });
  }

  //Удалим задачу из ДБ
  deleteRowFromDataBase(task) {
    deleteTask(task.id, ok => {
      if (ok) {
        this.props.getTasks();
        this.props.getTasksLog();
      }
    });
  }

  //Соберем таблицу для отображения задач
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
          key: "name",
          type: "string",
          disabled: true,
          value: "Задача",
          style: { width: 336 }
        },
        {
          key: "category_name",
          type: "string",
          disabled: true,
          value: "Категория",
          style: { width: 180 }
        },
        {
          key: "status_name",
          type: "string",
          disabled: true,
          value: "Статус",
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
          key: "execution_time",
          type: "string",
          disabled: true,
          value: "Время выполнения",
          style: { width: 160 }
        }
      ]
    ];

    this.props.tasksList.forEach(task => {
      //Соберем список категорий
      let categoriesList = [];

      this.props.categoriesList.forEach(category => {
        //Добавляем если категория активна, или эта категория проставлена у задачи
        if (category.close_date === null || category.id === task.category_id) {
          categoriesList.push({ value: category.id, children: category.name });
        }
      });

      //Соберем контент для селекта категорий с указанием текущей
      let categories = { list: categoriesList, current: task.category_id };

      //Соберем список статусов
      let statusesList = [];

      this.props.taskStatusesList.forEach(status => {
        //Добавляем если статус активен, или этот статус проставлен у задачи
        if (status.close_date === null || status.id === task.status_id) {
          statusesList.push({ value: status.id, children: status.name });
        }
      });

      //Соберем контент для селекта статусов с указанием текущего
      let statuses = { list: statusesList, current: task.status_id };

      content.push([
        {
          key: "id",
          type: "hidden",
          disabled: true,
          value: task.id,
          style: {}
        },
        {
          key: "name",
          type: "string",
          disabled: false,
          value: task.name,
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
        },
        {
          key: "description",
          type: "text",
          disabled: false,
          value: task.description,
          style: {}
        },
        {
          key: "execution_time",
          type: "time",
          disabled: true,
          value: getTimeFromMins(task.execution_time),
          style: { width: 160 }
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
        isStylable={true}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        update={() => this.props.getTasks()}
        addRow={() => this.addRowToDataBase()}
        deleteRow={row => this.deleteRowFromDataBase(row)}
      >
        {this.getContent()}
      </Table>
    );
  }
}

export default Tasks;
