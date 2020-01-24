import React from "react";
import addIcon from "../../Images/icon_add_96.png";
import { createTask } from "../../APIController/APIController";
import "./AddTaskButton.css";

class AddTaskButton extends React.Component {
  //Сохраним задачу в ДБ
  addTaskToDataBase() {
    let task = {
      category_id: this.props.categoriesList[0].id,
      status_id: Object.keys(this.props.taskStatuses)[0],
      name: "",
      name_style: "{}",
      description: "<br>",
      create_date: this.props.date
    };

    createTask(task, ok => {
      if (ok) {
        this.props.getTasks();
        this.props.getTasksLog();
      }
    });
  }

  render() {
    return (
      <div className="addTask">
        <div
          className="addTaskButton"
          style={{
            background:
              "url(" + addIcon + ") no-repeat scroll 4px 2px transparent",
            backgroundSize: "96px 96px"
          }}
          onClick={event => this.addTaskToDataBase(event)}
        ></div>
      </div>
    );
  }
}

export default AddTaskButton;
