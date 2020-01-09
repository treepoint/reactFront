import React from "react";
import Table from "../../../../../Components/Table/Table";
import ConfirmModalWindow from "../../../../../Components/ConfirmModalWindow/ConfirmModalWindow";
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
  constructor(props) {
    super(props);
    this.state = {
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  //Сохраним задачу в ДБ
  addRowToDataBase() {
    let task = {
      category_id: this.props.categoriesList[0].id,
      status_id: this.props.taskStatusesList[0].id,
      name: "",
      name_style: "{}",
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
  deleteRowFromDataBase() {
    deleteTask(this.state.deleteModalWindow.row.id, ok => {
      if (ok) {
        this.props.getTasks();
        this.props.getTasksLog();
      }
    });
  }

  //Закрыть модальное окно
  closeDeleteModal() {
    this.setState({ deleteModalWindow: { isHidden: true, row: null } });
  }

  //Показать модальное окно
  showDeleteModal(row) {
    this.setState({ deleteModalWindow: { isHidden: false, row } });
  }

  //Соберем таблицу для отображения задач
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
          key: "name",
          type: "string",
          disabled: true,
          value: "Задача",
          width: 574
        },
        {
          key: "category_name",
          type: "string",
          disabled: true,
          value: "Категория",
          width: 220
        },
        {
          key: "status_name",
          type: "string",
          disabled: true,
          value: "Статус",
          width: 210
        },
        {
          key: "execution_time_day",
          type: "string",
          disabled: true,
          value: "Время за день",
          width: 125
        },
        {
          key: "execution_time_all",
          type: "string",
          disabled: true,
          value: "Время, всего",
          width: 125
        }
      ]
    ];

    this.props.tasksList.forEach(task => {
      //Соберем список категорий
      let categoriesList = [];

      this.props.categoriesList.forEach(category => {
        //Добавляем если категория активна, или эта категория проставлена у задачи
        if (category.close_date === null || category.id === task.category_id) {
          categoriesList.push({
            value: category.id,
            label: category.name,
            style: category.name_style
          });
        }
      });

      //Соберем контент для селекта категорий с указанием текущей
      let categories = { list: categoriesList, current: task.category_id };

      //Соберем список статусов
      let statusesList = [];

      this.props.taskStatusesList.forEach(status => {
        //Добавляем если статус активен, или этот статус проставлен у задачи
        if (status.close_date === null || status.id === task.status_id) {
          statusesList.push({
            value: status.id,
            label: status.name,
            style: status.name_style
          });
        }
      });

      //Соберем контент для селекта статусов с указанием текущего
      let statuses = { list: statusesList, current: task.status_id };

      content.push([
        {
          key: "id",
          type: "hidden",
          disabled: true,
          value: task.id
        },
        {
          key: "name",
          type: "string",
          disabled: false,
          value: task.name,
          style: task.name_style
        },
        {
          key: "category_id",
          type: "select",
          disabled: false,
          value: categories
        },
        {
          key: "status_id",
          type: "select",
          disabled: false,
          value: statuses
        },
        {
          key: "execution_time_day",
          type: "time",
          disabled: true,
          value: getTimeFromMins(task.execution_time_day),
          style: {}
        },
        {
          key: "execution_time_all",
          type: "time",
          disabled: true,
          value: getTimeFromMins(task.execution_time_to_day),
          style: {}
        }
      ]);
    });
    return content;
  }

  render() {
    return (
      <React.Fragment>
        <ConfirmModalWindow
          title="Удалить задачу?"
          message="Вместе с задачей будут удалены все записи из лога и статистики. 
          Если вы хотите закрыть задачу — проставьте у неё статус с типом «Окончательный»."
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() => this.deleteRowFromDataBase()}
        />
        <Table
          isEditable={true}
          isResizeble={true}
          saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
          update={() => this.props.getTasks()}
          addRow={() => this.addRowToDataBase()}
          deleteRow={row => this.showDeleteModal(row)}
        >
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

export default Tasks;
