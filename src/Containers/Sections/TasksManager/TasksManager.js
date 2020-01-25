import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
import Tasks from "./Tasks/Tasks";
import TasksLog from "./TasksLog/TasksLog";
import Page from "../../../Components/Page/Page";
import DayPickerCarousel from "./DayPickerCarousel/DayPickerCarousel";
//Redux
import { connect } from "react-redux";
import { fetchTaskStatuses } from "../../../Store/actions/taskStatuses";
import { fetchCategories } from "../../../Store/actions/categories";
//API
import {
  getUserTasksByDate,
  getTasksLogByDate
} from "../../../APIController/APIController";

import { getCurrentFormatDate } from "../../../Libs/TimeUtils";
import "./TasksManager.css";

/* В общем, у нас здесь какая идея. Есть N компонентов, связанных между собой.
 * Например, при добавлении новой задачи, она автоматически должна появится в выпадающем списке задач в логе выполнения,
 * чтобы её можно было выбрать для указания времени.
 *
 * Кроме того, один компонент может строится на данных из другого компонента. Таким образом,
 * кажды компоеннт должна уметь обновлять другие компоненты, уметь брать данные из других компонентов.
 * Поэтому данный контейнер хранит функции для обновления компонентов и сами листы с инфой.
 *
 * Если какому-то компоненту нужна функция обновления другого или лист инфы — просто передаем его туда как пропсы.
 */

class TasksManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksList: [],
      tasksLogList: [],
      categoriesList: [],
      date: getCurrentFormatDate()
    };
  }

  componentDidMount() {
    //Категории и статусы обновляем только когда монтируем
    //Предполагается, что они не мутируют в процессе
    this.props.fetchCategories();
    this.props.fetchTaskStatuses();

    this.updateData(this.state.date);
  }

  updateData(date) {
    //Сначала обновляем таски, а потом лог
    this.getTasks(date, this.getTasksLog(date));
  }

  getTasks(date, callback) {
    getUserTasksByDate(date, result => {
      if (typeof callback === "function") {
        this.setState({ tasksList: result }, () => callback());
      } else {
        this.setState({ tasksList: result });
      }
    });
  }

  getTasksLog(date, callback) {
    getTasksLogByDate(date, result => {
      if (typeof callback === "function") {
        this.setState({ tasksLogList: result }, () => callback());
      } else {
        this.setState({ tasksLogList: result });
      }
    });
  }

  onPickDate(date) {
    this.setState({ date });

    this.updateData(date);
  }

  getCurrentTasksAndTaskLog = () => {
    return (
      <React.Fragment>
        <Tasks
          date={this.state.date}
          getTasks={callback => this.getTasks(this.state.date, callback)}
          getTasksLog={callback => this.getTasksLog(this.state.date, callback)}
          tasksList={this.state.tasksList}
          categories={this.props.categories}
          taskStatuses={this.props.taskStatuses}
        />
        <div className="taskLogTableContainer">
          <div className="taskLogTable">
            <TasksLog
              date={this.state.date}
              getTasksLog={callback =>
                this.getTasksLog(this.state.date, callback)
              }
              getTasks={callback => this.getTasks(this.state.date, callback)}
              tasksList={this.state.tasksList}
              tasksLogList={this.state.tasksLogList}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  getArchiveTasks = () => {
    return (
      <Tasks
        isArchive={true}
        date={this.state.date}
        getTasks={callback => this.getTasks(this.state.date, callback)}
        getTasksLog={callback => this.getTasksLog(this.state.date, callback)}
        categories={this.props.categories}
        taskStatuses={this.props.taskStatuses}
        taskStatusesList={this.state.taskStatusesList}
      />
    );
  };

  render() {
    //Соберем меню страницы
    let menuLinksArray = [
      { to: "/tasks_manager", value: "Текущие" },
      { to: "/tasks_manager/archive", value: "Архив" }
    ];

    return (
      <Page
        title="Задачи:"
        menuLinksArray={menuLinksArray}
        isPrivate={true}
        isNotScrollable={true}
      >
        <DayPickerCarousel onChange={date => this.onPickDate(date)} />

        <Switch>
          <Route
            exact
            to
            path="/tasks_manager"
            component={this.getCurrentTasksAndTaskLog}
          />
          <Route
            path="/tasks_manager/archive"
            component={this.getArchiveTasks}
          />
        </Switch>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskStatuses: state.taskStatuses,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTaskStatuses: () => {
      dispatch(fetchTaskStatuses());
    },
    fetchCategories: () => {
      dispatch(fetchCategories());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksManager);
