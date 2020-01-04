import React from "react";
import TaskStatistic from "./Tables/TaskStatistic";
import "./Statistic.css";

class Statistic extends React.Component {
  render() {
    return (
      <div className="statisticContainer">
        <div className="taskStatistic">
          {
            /*Таблица со статистикой по задачам*/
            <TaskStatistic />
          }
        </div>
      </div>
    );
  }
}

export default Statistic;
