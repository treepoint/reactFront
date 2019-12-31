import React from "react";
import Table from "../../Components/Table/Table";
import {
  getAllTaskStatuses,
  updateStatus,
  createStatus,
  deleteStatus,
  getAllTaskStatusesTypes
} from "../../APIController/APIController";

class TaskStatuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskStatusesList: [], taskStatusesTypesList: [] };
  }

  componentDidMount() {
    this.getAllTaskStatuses();
    this.getAllTaskStatusesTypes();
  }

  getAllTaskStatusesTypes(callback) {
    let promise = getAllTaskStatusesTypes();

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ taskStatusesTypesList: result }, () => callback());
        } else {
          this.setState({ taskStatusesTypesList: result });
        }
      }
    });
  }

  getAllTaskStatuses(callback) {
    let promise = getAllTaskStatuses();

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ taskStatusesList: result }, () => callback());
        } else {
          this.setState({ taskStatusesList: result });
        }
      }
    });
  }

  addRowToDataBase() {
    let promise = createStatus({ name: "", type_id: 1 });

    promise.then(result => {
      if (typeof result.insertId === "number") {
        this.getAllTaskStatuses();
      }
    });
  }

  deleteRowFromDataBase(taskStatus) {
    let promise = deleteStatus(taskStatus.id);

    promise.then(result => {
      if (result === "{success}") {
        this.getAllTaskStatuses();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(taskStatus, callback) {
    let promise = updateStatus(taskStatus.id, taskStatus);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getAllTaskStatuses(callback);
      }
    });
  }

  getContent() {
    let taskStatusesList = [
      [
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

    this.state.taskStatusesList.forEach(taskStatus => {
      //Соберем список типов статусов
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

      taskStatusesList.push([
        {
          key: "id",
          type: "string",
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
    });

    return taskStatusesList;
  }

  render() {
    console.log(this.getContent());
    return (
      <Table
        isResizeble={true}
        isSingleLineMode={true}
        addRow={(row, callback) => this.addRowToDataBase(row, callback)}
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
