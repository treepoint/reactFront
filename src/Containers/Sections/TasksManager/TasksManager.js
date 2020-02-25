import React from "react";
//Компоненты
import Tasks from "./Tasks/Tasks";
import TasksLog from "./TasksLog/TasksLog";
import Page from "../../../Components/Page/Page";
import DayPickerCarousel from "./DayPickerCarousel/DayPickerCarousel";
import SumTime from "../../../Components/SumTime/SumTime";
//Redux
import { connect } from "react-redux";
import { fetchTaskStatuses } from "../../../Store/actions/taskStatuses";
import { fetchCategories } from "../../../Store/actions/categories";
import { setScrollTop, setScrollLeft } from "../../../Store/actions/page";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Утилиты
import { getCurrentFormatDate } from "../../../Libs/TimeUtils";
//Картинки
import minimizeIcon from "../../../Images/icon_minimize.png";
import maximizedIcon from "../../../Images/icon_maximized.png";

class TasksManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isArchive: false,
      isAllMinimize: true,
      date: getCurrentFormatDate()
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchTaskStatuses();
  }

  //Нужно для правильного позиционирования fixed элементов в тасках
  handleScroll() {
    if (this._scrollBarRef !== null) {
      this.props.setScrollTop(this._scrollBarRef.scrollTop);
      this.props.setScrollLeft(this._scrollBarRef.scrollLeft);
    }
  }

  onPickDate(date) {
    this.setState({ date });
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

  changeArchiveCurrentTasks() {
    this.setState({ isArchive: !this.state.isArchive });
    //Нужно, чтобы при переключении архив\задачи правильно позиционировать fixed элементы
    this.props.setScrollTop(0);
    this.props.setScrollLeft(0);
  }

  render() {
    //Соберем меню страницы
    let anchorLinksArray = [
      {
        value: "Текущие",
        callback: () => this.changeArchiveCurrentTasks(),
        isCurrent: !this.state.isArchive
      },
      {
        value: "Архив",
        callback: () => this.changeArchiveCurrentTasks(),
        isCurrent: this.state.isArchive
      }
    ];

    //Соберем действия
    let actionsArray = [
      {
        icon: !!this.state.isAllMinimize ? maximizedIcon : minimizeIcon,
        onClick: () =>
          this.setState({ isAllMinimize: !this.state.isAllMinimize }),
        style: {}
      }
    ];

    return (
      <Page
        title="Задачи:"
        anchorLinksArray={anchorLinksArray}
        actionsArray={actionsArray}
        additionalTitleBlock={<SumTime />}
        isPrivate={true}
        isNotScrollable={true}
        isCustomContent={true}
      >
        <DayPickerCarousel onChange={date => this.onPickDate(date)} />
        {/*Вот эта карусель нужна, чтобы при переключении между архивом и текущими тасками не было задержки*/}

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
          <div style={{ display: !!this.state.isArchive ? "none" : null }}>
            <Tasks
              date={this.state.date}
              isAllMinimize={this.state.isAllMinimize}
            />
          </div>
          <div style={{ display: !!!this.state.isArchive ? "none" : null }}>
            <Tasks
              isArchive={true}
              date={this.state.date}
              isAllMinimize={this.state.isAllMinimize}
            />
          </div>
        </ReactCustomScroll>
        <TasksLog date={this.state.date} />
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
    },
    setScrollTop: number => {
      dispatch(setScrollTop(number));
    },
    setScrollLeft: number => {
      dispatch(setScrollLeft(number));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksManager);
