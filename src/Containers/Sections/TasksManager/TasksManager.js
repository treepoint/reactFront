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
      tabsState: {isActiveNow: true,
                  isAccomplished: false,
                  isAllActive: false},
      date: getCurrentFormatDate(),
      prevDate: getCurrentFormatDate()
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

    if (this.state.tabsState.isAllActive) {
      this.setState({tabsState : {isActiveNow : true, isAllActive : false, isAccomplished: false}})
    }
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

  setTasksState(state) {
    let tabsState = {isActiveNow: false, 
                     isAccomplished: false, 
                     isAllActive: false}

    switch (state) {
      case "activeNow" : tabsState = {tabsState, ...{isActiveNow: true}}; break;
      case "accomplished" : tabsState = {tabsState, ...{isAccomplished: true}}; break;
      case "allActive" : tabsState = {tabsState, ...{isAllActive: true}}; break;
      default : break;
    }

    this.setState({ tabsState});

    if (tabsState.isAllActive)  {
      //CP2077 gracias
      this.setState({date: "2077-01-01"});
    }

    if (tabsState.isAccomplished || tabsState.isActiveNow)  {
      this.setState({date: this.state.prevDate});
    }

    //Нужно, чтобы при переключении архив\задачи правильно позиционировать fixed элементы
    this.props.setScrollTop(0);
    this.props.setScrollLeft(0);
  }

  getTasks() {
    return (
      <div>
        <div style={{ display: !this.state.tabsState.isActiveNow ? "none" : null }}>
          <Tasks date={this.state.date} />
        </div>
        <div style={{ display: !this.state.tabsState.isAccomplished ? "none" : null }}>
           <Tasks isAccomplished={true} date={this.state.date} />
        </div>
        <div style={{ display: !this.state.tabsState.isAllActive ? "none" : null }}>
           <Tasks date={this.state.date} />
        </div>
      </div>
    )
  }

  render() {
    //Соберем меню страницы
    let anchorLinksArray = [
      {
        value: "Текущие",
        callback: () => this.setTasksState("activeNow"),
        isCurrent: this.state.tabsState.isActiveNow
      },
      {
        value: "Выполненные",
        callback: () => this.setTasksState("accomplished"),
        isCurrent: this.state.tabsState.isAccomplished
      },
      {
        value: "Все активные",
        callback: () => this.setTasksState("allActive"),
        isSecondaryOption: true,
        isCurrent: this.state.tabsState.isAllActive
      }
    ];

    return (
      <React.Fragment>
        <Page
          title="Задачи:"
          anchorLinksArray={anchorLinksArray}
          additionalTitleBlock={<SumTime forDate={this.state.date} />}
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
              height: "calc(-233px + 100vh)",
              marginTop: "1px"
            }}
            ref={ref => {
              this._scrollBarRef = ref;
            }}
            //Обрабатываем скролл
            onScrollStop={() => this.handleScroll()}
          >
          {this.getTasks()}
          </ReactCustomScroll>
        </Page>
        <TasksLog date={this.state.date} />
      </React.Fragment>
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
