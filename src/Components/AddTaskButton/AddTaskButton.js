import React from "react";
//Redux
import { connect } from "react-redux";
import { createTask } from "../../Store/actions/tasks";
//Компоненты
import TextContent from "../../Components/TextContent/TextContent"
import Button from "../../Components/Button/Button"
//Картинки
import addIcon from "../../Images/icon_add_96.png";
//CSS
import "./AddTaskButton.css";
import "../Task/Task.css";

class AddTaskButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isActivate: false,
      name: null,
      nameIsValid: true
    };
  }

  createNewTask() {
    if (this.state.name === null || this.state.name === "") {
      this.setState({ nameIsValid: false });
    } else {
      this.props.createTask(this.props.date, this.state.name);
      this.setState({ name: "", isActivate: false });
    }
  }

  showNewTaskForm(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isActivate: true })
  }

  render() {
    return (
      <div className="task">
        {!!this.state.isActivate ?
          <div className="newTaskContainer">
            <TextContent
              value={this.state.name}
              placeholder="Введите название задачи"
              autoFocus={true}
              width={240}
              height={69}
              isStylable={false}
              isHaveError={!this.state.nameIsValid}
              //Функции
              onChangeValue={value => this.setState({ name: value })}
            />
            <div className="newTaskButtons">
              <Button isPrimary value="Создать" onClick={() => this.createNewTask()} />
              <Button value="Отменить" onClick={() => this.setState({ name: "", isActivate: false })} />
            </div>
          </div> :
          <div
            className="addTaskButton"
            style={{
              background:
                "url(" + addIcon + ") no-repeat scroll 4px 2px transparent",
              backgroundSize: "96px 96px"
            }}
            onClick={(event) => this.showNewTaskForm(event)}
          ></div>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: (date, name) => {
      dispatch(createTask(date, name));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddTaskButton);
