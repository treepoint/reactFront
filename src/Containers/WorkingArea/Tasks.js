import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { getUserTasks } from "../../APIController/APIController";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasksList: [] };
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    let promise = getUserTasks();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ tasksList: result });
      }
    });
  }

  render() {
    //Соберем таблицу для отображения
    let tasks = [];
    tasks[0] = ["ID", "Название", "Описание", "Категория"];

    this.state.tasksList.forEach(task => {
      tasks.push([task.id, task.name, task.description, task.category_name]);
    });

    return (
      <div>
        <Table headerEditable={false} bodyEditable={true} isResizeble={true}>
          {tasks}
        </Table>
        <Button
          value="Обновить список задач"
          isPrimary={true}
          onClick={() => this.getTasks()}
        />
      </div>
    );
  }
}

export default Tasks;
