import React from "react";
//Компоненты
import TextContent from "../../../Components/TextContent/TextContent";
import Button from "../../../Components/Button/Button";
//CSS
import "../AddTaskButton.css";

class CreateAndExecuteStep extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      //Название таска
      name: null,
      //Валидность таска
      nameIsValid: true,
    };
  }

  //Создаем новую таску
  createNewTask(event) {
    if (!this.isNameNotEmpty()) {
      this.setState({ nameIsValid: false });

      return null;
    }

    this.props.createNewTask({
      name: this.state.name,
      category_id: null,
      executeNow: true,
    });

    this.onCancel(event);
  }

  //Чекаем заполнено ли имя задачи
  isNameNotEmpty() {
    if (this.state.name === null || this.state.name === "") {
      return false;
    }

    return true;
  }

  onCancel(event) {
    if (!!event) {
      event.stopPropagation();
    }

    this.props.setCurrentStep("");
  }

  //Название
  getNameField() {
    return (
      <TextContent
        value={this.state.name}
        placeholder="Введите название задачи"
        autoFocus={true}
        width={240}
        height={69}
        isStylable={false}
        isHaveError={!this.state.nameIsValid}
        //Функции
        onChangeValue={(value) => this.setState({ name: value })}
      />
    );
  }

  render() {
    return (
      <div className="stepContainer">
        <div className="stepBody">{this.getNameField()}</div>
        <div className="newTaskButtons">
          <Button
            isPrimary
            value="Создать"
            onClick={(event) => {
              event.stopPropagation();
            }}
            onMouseUp={(event) => this.createNewTask(event)}
          />
          <Button value="Отменить" onClick={(event) => this.onCancel(event)} />
        </div>
      </div>
    );
  }
}

export default CreateAndExecuteStep;
