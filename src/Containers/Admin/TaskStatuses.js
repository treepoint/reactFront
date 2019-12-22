import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import {
  getAllTaskStatuses,
  updateStatus
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

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(row, callback) {
    let body = {};

    row.forEach(item => {
      switch (item.type) {
        case "text":
          body[item.key] = item.value;
          break;
        case "select":
          body[item.key] = item.value.current;
          break;
        default:
          return;
      }
    });

    updateStatus(body.id, body);

    //Пока, если просто дошли до сюда, значит сохранили.
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  render() {
    let taskStatusesList = [
      [
        { key: "id", type: "text", value: "ID", style: { width: 30 } },
        { key: "name", type: "text", value: "Название", style: { width: 220 } }
      ]
    ];

    this.state.taskStatusesList.forEach(taskStatus => {
      taskStatusesList.push([
        { key: "id", type: "text", value: taskStatus.id, style: {} },
        { key: "name", type: "text", value: taskStatus.name, style: {} }
      ]);
    });

    return (
      <div>
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRowToDataBase={(row, callback) =>
            this.saveRowToDataBase(row, callback)
          }
        >
          {taskStatusesList}
        </Table>
        <Button
          value="Обновить список статусов"
          isPrimary={true}
          onClick={() => this.getAllTaskStatuses()}
        />
      </div>
    );
  }
}

export default TaskStatuses;
