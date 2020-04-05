import React from "react";
//Redux
import { connect } from "react-redux";
import { createTask } from "../../Store/actions/tasks";
//Шаги
import StartStep from "./Forms/StartStep";
import CreateAndExecuteStep from "./Forms/CreateAndExecuteStep";
import OnlyCreate from "./Forms/OnlyCreate";
//CSS
import "../Task/Task.css";

class AddTaskButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      stepName: "",
    };
  }

  //задаем текущий шаг
  setCurrentStep(stepName) {
    this.setState({ stepName: stepName });
  }

  //Получаем текущий шаг
  getStep() {
    switch (this.state.stepName) {
      case "onlyCreate":
        return (
          <OnlyCreate
            setCurrentStep={(stepName) => this.setCurrentStep(stepName)}
            createNewTask={(task) => this.createNewTask(task)}
            categories={this.props.categories}
          />
        );
      case "createAndExecute":
        return (
          <CreateAndExecuteStep
            setCurrentStep={(stepName) => this.setCurrentStep(stepName)}
            createNewTask={(task) => this.createNewTask(task)}
          />
        );
      default:
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

  render() {
    return <div className="task">{this.getStep()}</div>;
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
