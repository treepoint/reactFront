import React from "react";
import { getTimeFromMins } from "./UTILS";
import Table from "../../../../Components/Table/Table";

class TasksStatistic extends React.Component {
  //Соберем таблицу для статистики по категориям задач
  getContent() {
    let tasksStatistic = [];

    tasksStatistic[0] = [
      {
        value: "Категория",
        type: "string",
        disabled: true,
        style: { width: 230 }
      },
      {
        value: "Затрачено времени",
        type: "string",
        disabled: true,
        style: { width: 164 }
      }
    ];

    this.props.categoriesExecutionTimeList.forEach(category => {
      tasksStatistic.push([
        { value: category.name, type: "text", disabled: true, style: {} },
        {
          value: getTimeFromMins(category.execution_time),
          type: "time",
          disabled: true,
          style: {}
        }
      ]);
    });

    return tasksStatistic;
  }

  render() {
    return (
      <div>
        {/*Таблица со статистикой по задачам*/}
        <Table isEditable={false} isResizeble={true}>
          {this.getContent()}
        </Table>
      </div>
    );
  }
}

export default TasksStatistic;
