import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { getAllTaskStatuses } from "../../APIController/APIController";

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

  render() {
    let taskStatusesList = [
      [
        { value: "ID", style: { width: 30 } },
        { value: "Название", style: { width: 220 } }
      ]
    ];

    this.state.taskStatusesList.forEach(taskStatus => {
      taskStatusesList.push([
        { value: taskStatus.id, style: {} },
        { value: taskStatus.name, style: {} }
      ]);
    });

    return (
      <div>
        <Table headerEditable={false} bodyEditable={true} isResizeble={true}>
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
