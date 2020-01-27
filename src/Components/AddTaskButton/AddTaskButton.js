import React from "react";
//Redux
import { connect } from "react-redux";
import { createTask } from "../../Store/actions/tasks";
//Картинки
import addIcon from "../../Images/icon_add_96.png";
//CSS
import "./AddTaskButton.css";

class AddTaskButton extends React.PureComponent {
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
          onClick={() => this.props.createTask(this.props.date)}
        ></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: date => {
      dispatch(createTask(date));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddTaskButton);
