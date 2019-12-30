import React from "react";
import Table from "../../../../Components/Table/Table";
import {
  updateTask,
  createTask,
  deleteTask
} from "../../../../APIController/APIController";

class Tasks extends React.Component {
  //Сохраним изменяемую строку в ДБ
  saveTaskToDataBase(task, callback) {
    let promise = updateTask(task.id, task);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.props.getTasks(callback);
        this.props.getTimeExecutionForAllCategories();
      }
    });
  }

  //Сохраним задачу в ДБ
  addTaskToDataBase() {
    let task = {
      category_id: this.props.categoriesList[0].id,
      status_id: this.props.taskStatusesList[0].id,
      name: "",
      description: "<br>"
    };

    let promise = createTask(task);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.props.getTasks();
        this.props.getTasksLog();
      }
    });
  }

  //Удалим задачу из ДБ
  deleteTaskFromDataBase(task) {
    let promise = deleteTask(task.id);

    promise.then(result => {
      if (result === "{success}") {
        this.props.getTasks();
        this.props.getTasksLog();
        this.props.getTimeExecutionForAllCategories();
      }
    });
  }

  //Соберем таблицу для отображения задач
  getContent() {
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
        style: { width: 336 }
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
      },
      {
        key: "description",
        type: "string",
        disabled: true,
        value: "Описание",
        style: { width: 220 }
      }
    ];

    this.props.tasksList.forEach(task => {
      //Соберем список категорий
      let categoriesList = this.props.categoriesList.map(category => {
        return { value: category.id, children: category.name };
      });

      //добавим текущую
      let categories = { list: categoriesList, current: task.category_id };

      //Соберем список статусов
      let statusesList = this.props.taskStatusesList.map(status => {
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
        }
      ]);
    });

    return tasks;
  }

  render() {
    return (
      <Table
        isEditable={true}
        isResizeble={true}
        isStylable={true}
        saveRow={(row, callback) => this.saveTaskToDataBase(row, callback)}
        update={() => this.props.getTasks()}
        addRow={() => this.addTaskToDataBase()}
        deleteRow={row => this.deleteTaskFromDataBase(row)}
      >
        {this.getContent()}
      </Table>
    );
  }
}

export default Tasks;
