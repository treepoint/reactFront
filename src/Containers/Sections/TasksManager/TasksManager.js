import React from "react";
//Компоненты
import Tasks from "./Tasks/Tasks";
import TasksLog from "./TasksLog/TasksLog";
import Page from "../../../Components/Page/Page";
import DayPickerCarousel from "../../../Components/DayPickerCarousel/DayPickerCarousel";
import SumTime from "../../../Components/SumTime/SumTime";
//Redux
import { connect } from "react-redux";
import { fetchCategories } from "../../../Store/actions/categories";
import { setScrollTop, setScrollLeft } from "../../../Store/actions/page";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Утилиты
import { getCurrentFormatDate } from "../../../Libs/TimeUtils";

class TasksManager extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccomplished: false,
      date: getCurrentFormatDate()
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
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

  getAccomplishedTasks = () => {
    return <Tasks isAccomplished={true} date={this.state.date} />;
  };

  changeAccomplishedCurrentTasks() {
    this.setState({ isAccomplished: !this.state.isAccomplished });
    //Нужно, чтобы при переключении архив\задачи правильно позиционировать fixed элементы
    this.props.setScrollTop(0);
    this.props.setScrollLeft(0);
  }

  render() {
    //Соберем меню страницы
    let anchorLinksArray = [
      {
        value: "Текущие",
        callback: () => this.changeAccomplishedCurrentTasks(),
        isCurrent: !this.state.isAccomplished
      },
      {
        value: "Выполненные",
        callback: () => this.changeAccomplishedCurrentTasks(),
        isCurrent: this.state.isAccomplished
      }
    ];

    return (
      <Page
        title="Задачи:"
        anchorLinksArray={anchorLinksArray}
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
            height: "calc(-239px + 100vh)",
            marginTop: "1px"
          }}
          ref={ref => {
            this._scrollBarRef = ref;
          }}
          //Обрабатываем скролл
          onScrollStop={() => this.handleScroll()}
        >
          <div style={{ display: !!this.state.isAccomplished ? "none" : null }}>
            <Tasks date={this.state.date} />
          </div>
          <div
            style={{ display: !!!this.state.isAccomplished ? "none" : null }}
          >
            <Tasks isAccomplished={true} date={this.state.date} />
          </div>
        </ReactCustomScroll>
        <TasksLog date={this.state.date} />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(TasksManager);
