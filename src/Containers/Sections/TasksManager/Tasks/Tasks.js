import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setScrollTop, setScrollLeft } from "../../../../Store/actions/page";
import { fetchTasksByDate } from "../../../../Store/actions/tasks";
//Компоненты
import Task from "../../../../Components/Task/Task";
import AddTaskButton from "../../../../Components/AddTaskButton/AddTaskButton";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//CSS
import "./Tasks.css";

class Tasks extends React.Component {
  componentDidMount() {
    this.props.fetchTasksByDate(this.props.date);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.props.fetchTasksByDate(this.props.date);
    }
  }

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

  //Статусы по задаче
  getStatusesByTask(task) {
    //Соберем список статусов
    let statusesList = [];

    let taskStatuses = this.props.taskStatuses;

    for (var ts in taskStatuses) {
      //Добавляем если статус активен, или этот статус проставлен у задачи
      if (
        taskStatuses[ts].close_date === null ||
        taskStatuses[ts].id === task.status_id
      ) {
        statusesList.push({
          value: taskStatuses[ts].id,
          label: taskStatuses[ts].name,
          style: taskStatuses[ts].name_style
        });
      }
    }

    //Соберем контент для селекта статусов с указанием текущего
    return { list: statusesList, current: task.status_id };
  }

  //Соберем таблицу для отображения задач
  getTasks() {
    let content = [];
    const tasks = this.props.tasks;
    let tasksForChosenDate = {};

    //Отфильтруем за нужную дату
    for (var ts in tasks) {
      if (tasks[ts].for_date === this.props.date) {
        tasksForChosenDate[tasks[ts].id] = tasks[ts];
      }
    }

    //Если задачи еще не загружены — ничего не делаем
    if (this.props.tasksIsFetching) {
      return null;
    }

    //Проверим есть ли задачи
    if (Object.keys(tasksForChosenDate).length !== 0) {
      //Если есть — отрисуем
      for (var t in tasksForChosenDate) {
        //Отфильтруем в зависимости от того, смотрим мы по архиву или нет
        if (tasksForChosenDate[t].in_archive === 0 && !this.props.isArchive) {
          let taskContent = {
            id: tasksForChosenDate[t].id,
            statuses: this.getStatusesByTask(tasksForChosenDate[t]),
            name: tasksForChosenDate[t].name,
            name_style: tasksForChosenDate[t].name_style,
            categories: this.getCategoriesByTask(tasksForChosenDate[t]),
            execution_time_day: tasksForChosenDate[t].execution_time_day,
            execution_time_all: tasksForChosenDate[t].execution_time_to_day,
            in_archive: tasksForChosenDate[t].in_archive
          };

          content.push(
            <Task
              date={this.props.date}
              content={taskContent}
              isAllMinimize={this.props.isAllMinimize}
            />
          );
        }

        if (tasksForChosenDate[t].in_archive === 1 && this.props.isArchive) {
          let taskContent = {
            id: tasksForChosenDate[t].id,
            statuses: this.getStatusesByTask(tasksForChosenDate[t]),
            name: tasksForChosenDate[t].name,
            name_style: tasksForChosenDate[t].name_style,
            categories: this.getCategoriesByTask(tasksForChosenDate[t]),
            execution_time_day: tasksForChosenDate[t].execution_time_day,
            execution_time_all: tasksForChosenDate[t].execution_time_to_day,
            in_archive: tasksForChosenDate[t].in_archive
          };

          content.push(
            <Task
              date={this.props.date}
              content={taskContent}
              isAllMinimize={this.props.isAllMinimize}
            />
          );
        }
      }
    } else {
      content = (
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

    return content;
  }

  getAddTaskButton() {
    return <AddTaskButton date={this.props.date} />;
  }

  render() {
    return (
      <ReactCustomScroll
        //Задаем стиль
        style={{
          width: "100%",
          height: "calc(-213px + 100vh)",
          marginTop: "6px"
        }}
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

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    tasksIsFetching: state.tasksIsFetching,
    taskStatuses: state.taskStatuses,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setScrollTop: number => {
      dispatch(setScrollTop(number));
    },
    setScrollLeft: number => {
      dispatch(setScrollLeft(number));
    },
    fetchTasksByDate: date => {
      dispatch(fetchTasksByDate(date));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
