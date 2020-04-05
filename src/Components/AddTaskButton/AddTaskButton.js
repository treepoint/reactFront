import React from "react";
//Redux
import { connect } from "react-redux";
import { createTask } from "../../Store/actions/tasks";
//Компоненты
import Blur from "../../Components/Blur/Blur";
//Шаги
import StartStep from "./Steps/StartStep";
import FillNewTask from "./Steps/FillNewTask";
//CSS
import "../Task/Task.css";

class AddTaskButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      stepName: "",
      isBlurred: false,
    };
  }

  //задаем текущий шаг
  setCurrentStep(stepName) {
    this.setState({ stepName: stepName });
  }

  //Получаем текущий шаг
  getStep() {
    switch (this.state.stepName) {
      case "executeNow":
        return (
          <FillNewTask
            setCurrentStep={(stepName) => this.setCurrentStep(stepName)}
            createNewTask={(task) => this.createNewTask(task)}
            categories={this.props.categories}
            isBlurred={this.state.isBlurred}
            executeNow
          />
        );
      case "executeNotNow":
        return (
          <FillNewTask
            setCurrentStep={(stepName) => this.setCurrentStep(stepName)}
            createNewTask={(task) => this.createNewTask(task)}
            categories={this.props.categories}
            isBlurred={this.state.isBlurred}
          />
        );
      default:
        this.setState({ isBlurred: false });
        return (
          <StartStep
            setCurrentStep={(stepName) => this.setCurrentStep(stepName)}
          />
        );
    }
  }

  //Создаем новую таску
  createNewTask(task) {
    this.props.createTask(
      this.props.date,
      task.name,
      task.category_id,
      task.executeNow
    );
  }

  //Блюр
  getBlur() {
    if (this.state.stepName !== "") {
      return (
        <Blur
          style={{ background: "rgba(0, 0, 0, 0.2)" }}
          onClick={(event) => this.setState({ isBlurred: true })}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getBlur()}
        <div
          className="newTask"
          style={!!this.state.stepName ? { zIndex: "6" } : null}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          {this.getStep()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (date, name, category_id, executeNow) => {
      dispatch(createTask(date, name, category_id, executeNow));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskButton);
