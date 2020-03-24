import React from "react";
//Redux
import { connect } from "react-redux";
import { createTask } from "../../Store/actions/tasks";
//Компоненты
import TextContent from "../../Components/TextContent/TextContent";
import SelectContent from "../../Components/SelectContent/SelectContent";
import Button from "../../Components/Button/Button";
//Картинки
import addIcon from "../../Images/icon_add_96.png";
//CSS
import "./AddTaskButton.css";
import "../Task/Task.css";

class AddTaskButton extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showNameField: false,
      name: null,
      nameIsValid: true,
      showCategoryPicker: false,
      category_id: null
    };
  }

  //Чекаем заполнено ли имя задачи
  isNameNotEmpty() {
    if (this.state.name === null || this.state.name === "") {
      return false;
    }

    return true;
  }

  //Сбросить форму
  resetForm() {
    this.setState({
      name: "",
      showNameField: false,
      showCategoryPicker: false,
      category_id: null
    });
  }

  //Создаем новую таску
  createNewTask() {
    this.props.createTask(
      this.props.date,
      this.state.name,
      this.state.category_id
    );
    this.resetForm();
  }

  //Показать форму создания таски, в первую очередь названия
  showNewTaskForm(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showNameField: true });
  }

  //Показать форму выбора категории
  showCategoryPicker(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.isNameNotEmpty()) {
      this.setState({ showCategoryPicker: true });
    } else {
      this.setState({ nameIsValid: false });
    }
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
        onChangeValue={value => this.setState({ name: value })}
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
          style: categories[c].name_style
        });
      }
    }

    //Соберем контент для селекта категорий с указанием текущей
    return { list: categoriesList, current: category_id };
  }

  //Категория
  getCategorySelect() {
    return (
      <div>
        <div className="newTaskSelectLable">Категория: </div>
        <SelectContent
          isMinimized={false}
          value={this.getCategoriesByTask()}
          height={34}
          onChangeValue={category =>
            this.setState({ category_id: category.current })
          }
        />
      </div>
    );
  }

  render() {
    return (
      <div
        className="task"
        onClick={event => {
          event.stopPropagation();
        }}
      >
        {!!this.state.showNameField ? (
          <div className="newTaskContainer">
            <div className="newTaskItem">
              {!!!this.state.showCategoryPicker
                ? this.getNameField()
                : this.getCategorySelect()}
            </div>
            <div className="newTaskButtons">
              <Button
                isPrimary
                value={!!!this.state.showCategoryPicker ? "Далее" : "Создать"}
                onClick={event => {
                  event.stopPropagation();
                }}
                onMouseUp={
                  !!!this.state.showCategoryPicker
                    ? event => this.showCategoryPicker(event)
                    : event => this.createNewTask(event)
                }
              />
              <Button value="Отменить" onClick={() => this.resetForm()} />
            </div>
          </div>
        ) : (
          <div
            className="addTaskButton"
            style={{
              background:
                "url(" + addIcon + ") no-repeat scroll 4px 2px transparent",
              backgroundSize: "96px 96px"
            }}
            onClick={event => this.showNewTaskForm(event)}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTask: (date, name, category_id) => {
      dispatch(createTask(date, name, category_id));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddTaskButton);
