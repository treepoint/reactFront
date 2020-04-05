import React from "react";
//Компоненты
import TextContent from "../../TextContent/TextContent";
import SelectContent from "../../SelectContent/SelectContent";
import HeaderAnchor from "../../HeaderAnchor/HeaderAnchor";
//CSS
import "../AddTaskButton.css";
import "../../Task/Task.css";
import "./FillNewTask.css";

class FillNewTask extends React.PureComponent {
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

  componentDidUpdate() {
    if (this.props.isBlurred) {
      this.createNewTask();
    }
  }

  //Создаем новую таску
  createNewTask(event) {
    //Если сейчас имя — сначала нужно проверочку прогнать
    if (!this.isNameNotEmpty()) {
      this.setState({ nameIsValid: false });

      return;
    }

    this.props.createNewTask({
      name: this.state.name,
      category_id: this.state.category_id,
      executeNow: this.props.executeNow,
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

  //Выполняется при отмене создания
  onCancel(event) {
    if (!!event) {
      event.stopPropagation();
    }

    this.props.setCurrentStep("");
  }

  //Название
  getNameField() {
    return (
      <div className="newTaskNameContainer">
        <TextContent
          value={this.state.name}
          placeholder="Укажите название и категорию"
          autoFocus={true}
          width={249}
          height={69}
          isStylable={false}
          isHaveError={!this.state.nameIsValid}
          //Функции
          onChangeValue={(value) => this.setState({ name: value })}
        />
      </div>
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
      <div className="categoryNewTask">
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

  render() {
    return (
      <React.Fragment>
        {this.getNameField()}
        <div className="optionalPart">
          {this.getCategorySelect()}
          <HeaderAnchor style={{ marginTop: "6px" }}>
            <div onClick={(event) => this.onCancel(event)}>отмена</div>
          </HeaderAnchor>
        </div>
      </React.Fragment>
    );
  }
}

export default FillNewTask;
