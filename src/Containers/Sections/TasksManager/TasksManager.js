import React from "react";
//Компоненты
import Tasks from "./Tasks/Tasks";
import TasksLog from "./TasksLog/TasksLog";
import Page from "../../../Components/Page/Page";
import DayPickerCarousel from "./DayPickerCarousel/DayPickerCarousel";
//Redux
import { connect } from "react-redux";
import { fetchTaskStatuses } from "../../../Store/actions/taskStatuses";
import { fetchCategories } from "../../../Store/actions/categories";
//API
import { getTasksLogByDate } from "../../../APIController/APIController";

import { getCurrentFormatDate } from "../../../Libs/TimeUtils";

class TasksManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isArchive: false,
      tasksLogList: [],
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

  showArchiveTasks() {
    this.setState({ isArchive: true });
  }

  showActiveTasks() {
    this.setState({ isArchive: false });
  }

  updateData(date) {
    this.getTasksLog(date);
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
        <Tasks date={this.state.date} />

        <TasksLog
          date={this.state.date}
          getTasksLog={callback => this.getTasksLog(this.state.date, callback)}
          getTasks={callback => this.getTasks(this.state.date, callback)}
          tasksList={this.state.tasksList}
          tasksLogList={this.state.tasksLogList}
        />
      </React.Fragment>
    );
  };

  getArchiveTasks = () => {
    return <Tasks isArchive={true} date={this.state.date} />;
  };

  render() {
    //Соберем меню страницы
    let anchorLinksArray = [
      {
        value: "Текущие",
        callback: () => this.showActiveTasks(),
        isCurrent: !this.state.isArchive
      },
      {
        value: "Архив",
        callback: () => this.showArchiveTasks(),
        isCurrent: this.state.isArchive
      }
    ];

    return (
      <Page
        title="Задачи:"
        anchorLinksArray={anchorLinksArray}
        isPrivate={true}
        isNotScrollable={true}
      >
        <DayPickerCarousel onChange={date => this.onPickDate(date)} />
        {/*Вот эта карусель нужна, чтобы при переключении между архивом и текущими тасками не было лага*/}
        <div style={{ display: !!this.state.isArchive ? "none" : null }}>
          <Tasks date={this.state.date} />
        </div>
        <div style={{ display: !!!this.state.isArchive ? "none" : null }}>
          <Tasks isArchive={true} date={this.state.date} />
        </div>
        {
          <TasksLog
            date={this.state.date}
            tasksLogList={this.state.tasksLogList}
          />
        }
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
