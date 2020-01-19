import React from "react";
import Task from "../../../../Components/Task/Task";
import AddTaskButton from "../../../../Components/AddTaskButton/AddTaskButton";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем redux
import { connect } from "react-redux";
import { setScrollTop, setScrollLeft } from "../../../../Store/actions/page";
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
import "./Tasks.css";

class Tasks extends React.Component {
  //Нужно для правильного позиционирования fixed элементов в тасках
  handleScroll() {
    if (this._scrollBarRef !== null) {
      this.props.setScrollTop(this._scrollBarRef.scrollTop);
      this.props.setScrollLeft(this._scrollBarRef.scrollLeft);
    }
  }

  //Категории по задаче
  getCategoriesByTask(task) {
    //Соберем список категорий
    let categoriesList = [];

    this.props.categoriesList.forEach(category => {
      //Добавляем если категория активна, или эта категория проставлена у задачи
      if (category.close_date === null || category.id === task.category_id) {
        categoriesList.push({
          value: category.id,
          label: category.name,
          style: category.name_style
        });
      }
    });

    //Соберем контент для селекта категорий с указанием текущей
    return { list: categoriesList, current: task.category_id };
  }

  //Статусы по задаче
  getStatusesByTask(task) {
    //Соберем список статусов
    let statusesList = [];

    this.props.taskStatusesList.forEach(status => {
      //Добавляем если статус активен, или этот статус проставлен у задачи
      if (status.close_date === null || status.id === task.status_id) {
        statusesList.push({
          value: status.id,
          label: status.name,
          style: status.name_style
        });
      }
    });

    //Соберем контент для селекта статусов с указанием текущего
    return { list: statusesList, current: task.status_id };
  }

  //Соберем таблицу для отображения задач
  getTasks() {
    let tasks = [];

    this.props.tasksList.forEach(task => {
      //Отфильтруем в зависимости от того, смотрим мы по архиву или нет
      if (task.in_archive === 1 && !this.props.isArchive) {
        return null;
      }

      if (task.in_archive === 0 && this.props.isArchive) {
        return null;
      }

      tasks.push(
        <Task
          date={this.props.date}
          getTasks={() => this.props.getTasks()}
          getTasksLog={() => this.props.getTasksLog()}
          content={{
            id: task.id,
            statuses: this.getStatusesByTask(task),
            name: task.name,
            name_style: task.name_style,
            categories: this.getCategoriesByTask(task),
            execution_time_day: getTimeFromMins(task.execution_time_day),
            execution_time_all: getTimeFromMins(task.execution_time_to_day),
            in_archive: task.in_archive
          }}
        />
      );
    });

    return tasks;
  }

  getAddTaskButton() {
    return (
      <AddTaskButton
        date={this.props.date}
        getTasks={() => this.props.getTasks()}
        getTasksLog={() => this.props.getTasksLog()}
        categoriesList={this.props.categoriesList}
        taskStatusesList={this.props.taskStatusesList}
      />
    );
  }

  render() {
    return (
      <ReactCustomScroll
        //Задаем стиль
        style={{ width: "100%", height: "calc(-233px + 100vh)" }}
        ref={ref => {
          this._scrollBarRef = ref;
        }}
        //Обрабатываем скролл
        onScrollStop={() => this.handleScroll()}
      >
        <div className="taskContainer">
          {this.getTasks()}

          {/*Если это не архив — покажем кнопку добавления тасков*/ !!!this
            .props.isArchive
            ? this.getAddTaskButton()
            : null}
        </div>
      </ReactCustomScroll>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScrollTop: number => {
      dispatch(setScrollTop(number));
    },
    setScrollLeft: number => {
      dispatch(setScrollLeft(number));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Tasks);
