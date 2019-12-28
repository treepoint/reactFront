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

  getAllTaskStatuses() {
    let promise = getAllTaskStatuses();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ taskStatusesList: result });
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
    updateStatus(taskStatus.id, taskStatus);

    //Пока, если просто дошли до сюда, значит сохранили и нужно сказать об этом таблице
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
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
      <div>
        <Table
          isResizeble={true}
          isSingleLineMode={true}
          addRowToDataBase={(row, callback) =>
            this.addRowToDataBase(row, callback)
          }
          saveRowToDataBase={(row, callback) =>
            this.saveRowToDataBase(row, callback)
          }
          deleteRowFromDataBase={row => this.deleteRowFromDataBase(row)}
          updateTableContent={() => this.getAllTaskStatuses()}
        >
          {taskStatusesList}
        </Table>
      </div>
    );
  }
}

export default TaskStatuses;
