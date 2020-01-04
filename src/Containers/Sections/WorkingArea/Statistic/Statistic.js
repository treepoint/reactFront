import React from "react";
import TaskStatistic from "./Tables/TaskStatistic";
import CategoriesStatistic from "./Tables/CategoriesStatistic";
import "./Statistic.css";

class Statistic extends React.Component {
  render() {
    return (
      <div className="statisticContainer">
        <div className="statisticTable">
          {
            /*Таблица со статистикой по категория*/
            <CategoriesStatistic />
          }
        </div>
        <div className="statisticTable">
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
