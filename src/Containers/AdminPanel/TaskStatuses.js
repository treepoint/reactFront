import React from "react";
import Table from "../../Components/Table/Table";
import {
  getAllTaskStatuses,
  updateStatus,
  createStatus,
  deleteStatus
} from "../../APIController/APIController";

class TaskStatuses extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskStatusesList: [] };
  }

  componentDidMount() {
    this.getAllTaskStatuses();
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
    let promise = createStatus({ name: "" });

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

  render() {
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
        }
      ]
    ];

    this.state.taskStatusesList.forEach(taskStatus => {
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
        }
      ]);
    });

    return (
      <Table
        isResizeble={true}
        isSingleLineMode={true}
        addRow={(row, callback) => this.addRowToDataBase(row, callback)}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        deleteRow={row => this.deleteRowFromDataBase(row)}
        update={() => this.getAllTaskStatuses()}
      >
        {taskStatusesList}
      </Table>
    );
  }
}

export default TaskStatuses;
