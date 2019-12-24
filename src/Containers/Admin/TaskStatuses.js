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
  saveRowToDataBase(taskStatus, callback) {
    updateStatus(taskStatus.id, taskStatus);

    //Пока, если просто дошли до сюда, значит сохранили и нужно сказать об этом таблице
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  render() {
    let taskStatusesList = [
      [
        { key: "id", type: "string", value: "ID", style: { width: 30 } },
        {
          key: "name",
          type: "string",
          value: "Название",
          style: { width: 220 }
        }
      ]
    ];

    this.state.taskStatusesList.forEach(taskStatus => {
      taskStatusesList.push([
        { key: "id", type: "string", value: taskStatus.id, style: {} },
        { key: "name", type: "string", value: taskStatus.name, style: {} }
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
