import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Утилиты
import { getCurrentFormatDate, getTimeFromMins } from "../../Libs/TimeUtils";
//CSS
import "./SumTime.css";

class SumTime extends React.PureComponent {
  getTimeForCurrentDay() {
    //После этого пройдемся и соберем все записи таск лога
    const tasksLog = this.props.tasksLog;

    let tasksLogForChosenDate = {};

    //Отфильтруем за нужную дату
    for (var tl in tasksLog) {
      if (tasksLog[tl].for_date === getCurrentFormatDate()) {
        tasksLogForChosenDate[tasksLog[tl].id] = tasksLog[tl];
      }
    }

    //Посчитаем время выполнения
    let allExecutionTime = 0;

    for (var tlcd in tasksLogForChosenDate) {
      //Если время выполнения задачи отрицительное — не считаем его
      if (tasksLogForChosenDate[tlcd].execution_time > 0) {
        allExecutionTime += tasksLogForChosenDate[tlcd].execution_time;
      }
    }

    return getTimeFromMins(allExecutionTime);
  }

  render() {
    return <div className="sumTime">{this.getTimeForCurrentDay()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    tasksLog: state.tasksLog
  };
};

export default connect(mapStateToProps)(SumTime);
