import React from "react";
import Task from "../../../../Components/Task/Task";
import AddTaskButton from "../../../../Components/AddTaskButton/AddTaskButton";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем redux
import { connect } from "react-redux";
import { setScrollTop, setScrollLeft } from "../../../../Store/actions";
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
import "./Tasks.css";

class Tasks extends React.Component {
  //Нужно для правильного позиционирования элементов в таблицах
  handleVerticalScroll() {
    if (this._scrollBarRef !== null) {
      this.props.setScrollTop(this._scrollBarRef.scrollTop);
      this.props.setScrollLeft(this._scrollBarRef.scrollLeft);
    }
  }

  //Соберем таблицу для отображения задач
  getTasks() {
    let tasks = [];

    this.props.tasksList.forEach(task => {
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
      let categories = { list: categoriesList, current: task.category_id };

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
      let statuses = { list: statusesList, current: task.status_id };

      tasks.push(
        <Task
          date={this.props.date}
          getTasks={() => this.props.getTasks()}
          getTasksLog={() => this.props.getTasksLog()}
          content={{
            id: {
              type: "hidden",
              disabled: true,
              value: task.id
            },
            status_id: {
              type: "select",
              disabled: false,
              value: statuses
            },
            name: {
              type: "string",
              disabled: false,
              value: task.name,
              style: task.name_style
            },
            category_id: {
              type: "select",
              disabled: false,
              value: categories
            },
            execution_time_day: {
              type: "time",
              disabled: true,
              value: getTimeFromMins(task.execution_time_day),
              style: {}
            },
            execution_time_all: {
              type: "time",
              disabled: true,
              value: getTimeFromMins(task.execution_time_to_day),
              style: {}
            }
          }}
        />
      );
    });

    return tasks;
  }

  render() {
    return (
      <React.Fragment>
        <ReactCustomScroll
          //Задаем стиль
          style={{ width: "100%", height: "calc(-193px + 100vh)" }}
          //Обрабатываем вертикальный скролл
          ref={ref => {
            this._scrollBarRef = ref;
          }}
          onScrollStop={() => this.handleVerticalScroll()}
        >
          <div className="taskContainer">
            {this.getTasks()}

            <AddTaskButton
              date={this.props.date}
              getTasks={() => this.props.getTasks()}
              getTasksLog={() => this.props.getTasksLog()}
              categoriesList={this.props.categoriesList}
              taskStatusesList={this.props.taskStatusesList}
            />
          </div>
        </ReactCustomScroll>
      </React.Fragment>
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
