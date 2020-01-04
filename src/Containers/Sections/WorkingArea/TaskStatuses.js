import React from "react";
import Table from "../../../Components/Table/Table";
import {
  getAllTaskStatuses,
  updateStatus,
  createStatus,
  deleteStatus,
  getAllTaskStatusesTypes
} from "../../../APIController/APIController";

class TaskStatuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskStatusesList: [], taskStatusesTypesList: [] };
  }

  componentDidMount() {
    this.getAllTaskStatuses();
    this.getAllTaskStatusesTypes();
  }

  //Получаем все статусы
  getAllTaskStatuses(callback) {
    getAllTaskStatuses(result => {
      if (typeof callback === "function") {
        this.setState({ taskStatusesList: result }, () => callback());
      } else {
        this.setState({ taskStatusesList: result });
      }
    });
  }

  //Получаем все типы статусов
  getAllTaskStatusesTypes() {
    getAllTaskStatusesTypes(result => {
      this.setState({ taskStatusesTypesList: result });
    });
  }

  //Добавим новую строку
  addRowToDataBase() {
    let status = { name: "", type_id: 1 };

    createStatus(status, ok => {
      if (ok) {
        this.getAllTaskStatuses();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(taskStatus, callback) {
    updateStatus(taskStatus, ok => {
      if (ok) {
        this.getAllTaskStatuses(callback);
      }
    });
  }

  //Удалим строку
  deleteRowFromDataBase(taskStatus) {
    deleteStatus(taskStatus.id, ok => {
      if (ok) {
        this.getAllTaskStatuses();
      }
    });
  }

  //Получим контент для таблицы
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
          value: "Название",
          style: { width: 300 }
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Тип статуса",
          style: { width: 300 }
        }
      ]
    ];

    //Соберем список типов статусов
    this.state.taskStatusesList.forEach(taskStatus => {
      //Если статусы не закрыты — отобразим их
      if (taskStatus.close_date === null) {
        let taskStatusesTypesList = this.state.taskStatusesTypesList.map(
          taskStatusType => {
            return { value: taskStatusType.id, children: taskStatusType.name };
          }
        );

        //добавим текущую
        let taskStatusesTypes = {
          list: taskStatusesTypesList,
          current: taskStatus.type_id
        };

        content.push([
          {
            key: "id",
            type: "hidden",
            disabled: true,
            value: taskStatus.id,
            style: {}
          },
          {
            key: "name",
            type: "string",
            disabled: false,
            value: taskStatus.name,
            style: {}
          },
          {
            key: "type_id",
            type: "select",
            disabled: false,
            value: taskStatusesTypes,
            style: {}
          }
        ]);
      }
    });

    return content;
  }

  render() {
    return (
      <Table
        isResizeble={true}
        addRow={row => this.addRowToDataBase(row)}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        deleteRow={row => this.deleteRowFromDataBase(row)}
        update={() => this.getAllTaskStatuses()}
      >
        {this.getContent()}
      </Table>
    );
  }
}

export default TaskStatuses;
