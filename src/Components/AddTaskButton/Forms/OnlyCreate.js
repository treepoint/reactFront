import React from "react";
//Компоненты
import TextContent from "../../../Components/TextContent/TextContent";
import SelectContent from "../../../Components/SelectContent/SelectContent";
import Button from "../../../Components/Button/Button";
//CSS
import "../AddTaskButton.css";

class AddTaskButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      //Финальное ли это тело шага
      isFinalBody: false,
      //Название таска
      name: null,
      //Валидность таска
      nameIsValid: true,
      //ID выбранной категории
      category_id: null,
      //Текущее тело, нужен, чтобы верно рендерить текущее тело
      currentBody: "name",
    };
  }

  //Создаем новую таску
  createNewTask(event) {
    this.props.createNewTask({
      name: this.state.name,
      category_id: this.state.category_id,
      executeNow: false,
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
    this.setState({ nextBody: "category" });

    return (
      <TextContent
        value={this.state.name}
        placeholder="Введите название задачи, категорию — после создания"
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

  //Категории по задаче
  getCategoriesByTask() {
    //Соберем список категорий
    const categories = this.props.categories;

    let category_id;

    if (!this.state.category_id) {
      let category_id = categories[Object.keys(categories)[0]].id;

      //Запишем в стейт
      this.setState({ category_id });
    } else {
      category_id = this.state.category_id;
    }

    let categoriesList = [];

    for (var c in categories) {
      //Добавляем если категория активна, или эта категория проставлена у задачи
      if (categories[c].close_date === null) {
        categoriesList.push({
          value: categories[c].id,
          label: categories[c].name,
          style: categories[c].name_style,
        });
      }
    }

    //Соберем контент для селекта категорий с указанием текущей
    return { list: categoriesList, current: category_id };
  }

  //Категория
  getCategorySelect() {
    this.setState({ isFinalBody: true });

    return (
      <div>
        <div className="newTaskSelectLable">Категория: </div>
        <SelectContent
          isMinimized={false}
          value={this.getCategoriesByTask()}
          height={34}
          onChangeValue={(category) =>
            this.setState({ category_id: category.current })
          }
        />
      </div>
    );
  }

  //Получим текущую тушку шага
  getCurrentTaskBody() {
    switch (this.state.currentBody) {
      case "name":
        return this.getNameField();
      case "category":
        return this.getCategorySelect();
      default:
        break;
    }
  }

  //Получим нужную текущую основную кнопку
  getPrimaryButton() {
    if (this.state.isFinalBody) {
      return (
        <Button
          isPrimary
          value="Создать"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onMouseUp={(event) => this.createNewTask(event)}
        />
      );
    } else {
      return (
        <Button
          isPrimary
          value="Далее"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onMouseUp={(event) => this.setNextBody(event)}
        />
      );
    }
  }

  //Выставлем новое тело
  setNextBody() {
    //Если сейчас имя — сначала нужно проверочку прогнать
    if (this.state.currentBody === "name" && this.isNameNotEmpty()) {
      this.setState(
        { nameIsValid: true },
        this.setState({ currentBody: "category" })
      );
    } else {
      this.setState({ nameIsValid: false });
    }
  }

  render() {
    return (
      <div className="stepContainer">
        <div className="stepBody">{this.getCurrentTaskBody()}</div>
        <div className="newTaskButtons">
          {this.getPrimaryButton()}
          <Button value="Отменить" onClick={(event) => this.onCancel(event)} />
        </div>
      </div>
    );
  }
}

export default AddTaskButton;
