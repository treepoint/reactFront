import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { fetchTasksByDate } from "../../../../Store/actions/tasks";
import { setTitle } from "../../../../Store/actions/app";
//Компоненты
import Task from "../../../../Components/Task/Task";
import AddTaskButton from "../../../../Components/AddTaskButton/AddTaskButton";
//CSS
import "./Tasks.css";

class Tasks extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.fetchTasksByDate(this.props.date);
    }
  }

  shouldComponentUpdate(prevProps) {
    //Если задачи не получены — нечего рисовать
    if (this.props.tasksIsFetching) {
      return false;
    }

    //Но если задачи получили, отрисуем только если состояние поменялось
    if (prevProps.tasks !== this.props.tasks) {
      return true;
    } else {
      //Иначе чекнем, что либо категории либо статусы поменялись
      if (
        prevProps.taskStatuses !== this.props.taskStatuses ||
        prevProps.categories !== this.props.categories
      ) {
        return true;
      }
    }

    //Иначе — не рендерим
    return false;
  }

  setTasksCountInTitle(count) {
    if (!this.props.isAccomplished) {
      this.props.setTitle("Задачи на сегодня (" + count + ") | todayTasks");
    }
  }

  //Категории по задаче
  getCategoriesByTask(task) {
    //Соберем список категорий
    let categoriesList = [];

    const categories = this.props.categories;

    for (var c in categories) {
      //Добавляем если категория активна, или эта категория проставлена у задачи
      if (
        categories[c].close_date === null ||
        categories[c].id === task.category_id
      ) {
        categoriesList.push({
          value: categories[c].id,
          label: categories[c].name,
          style: categories[c].name_style
        });
      }
    }

    //Соберем контент для селекта категорий с указанием текущей
    return { list: categoriesList, current: task.category_id };
  }

  //Соберем таблицу для отображения задач
  getTasks() {
    let content = [];
    const tasks = this.props.tasks;
    let tasksForChosenDate = {};

    //Отфильтруем за нужную дату. Так же проверим, что таск не перенесен
    for (var ts in tasks) {
      if (tasks[ts].for_date === this.props.date) {
        tasksForChosenDate[tasks[ts].id] = tasks[ts];
      }
    }

    //Если задачи еще не загружены — ничего не делаем
    if (this.props.tasksIsFetching) {
      return null;
    }

    //Если же уже загрузили, но задач 0 — отобразим заглушку
    if (
      !this.props.tasksIsFetching &&
      Object.keys(tasksForChosenDate).length === 0
    ) {
      return (
        <div className="task">
          <div className="tasksNotExistsMessage">
            <p className="tasksNotExistsMessage p">Задачи не найдены.</p>
            <p className="tasksNotExistsMessage p">
              {" "}
              Выберите другую дату или добавьте новую задачу.
            </p>
          </div>
        </div>
      );
    }

    //Если задачи есть — соберем их
    for (var t in tasksForChosenDate) {
      //Отфильтруем в зависимости от того, смотрим мы по архиву или нет
      if (
        (tasksForChosenDate[t].closed_date !== null &&
          this.props.isAccomplished) ||
        (tasksForChosenDate[t].closed_date === null &&
          !this.props.isAccomplished)
      ) {
        content.push(
          <Task
            date={this.props.date}
            content={{
              id: tasksForChosenDate[t].id,
              name: tasksForChosenDate[t].name,
              description: tasksForChosenDate[t].description,
              categories: this.getCategoriesByTask(tasksForChosenDate[t]),
              execution_time_day: tasksForChosenDate[t].execution_time_day,
              execution_time_all: tasksForChosenDate[t].execution_time_to_day,
              in_archive: tasksForChosenDate[t].in_archive,
              frozen: tasksForChosenDate[t].frozen,
              on_fire: tasksForChosenDate[t].on_fire,
              moved_date: tasksForChosenDate[t].moved_date,
              closed_date: tasksForChosenDate[t].closed_date
            }}
          />
        );
      }
    }

    this.setTasksCountInTitle(content.length);

    //И вернем
    return content;
  }

  getAddTaskButton() {
    return (
      <AddTaskButton
        date={this.props.date}
        categories={this.props.categories}
      />
    );
  }

  render() {
    return (
      <div className="taskContainer">
        {this.getTasks()}
        {/*Если это не архив — покажем кнопку добавления тасков*/
        !!!this.props.isAccomplished ? this.getAddTaskButton() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    tasksIsFetching: state.tasksIsFetching,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasksByDate: date => {
      dispatch(fetchTasksByDate(date));
    },
    setTitle: title => {
      dispatch(setTitle(title));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
