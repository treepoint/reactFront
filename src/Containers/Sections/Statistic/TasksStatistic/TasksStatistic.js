import React from "react";
import Table from "../../../../Components/Table/Table";
import { getTaskStatisticByPeriod } from "../../../../APIController/APIController";
import DatePeriodPickerCarousel from "../../../../Components/DatePeriodPickerCarousel/DatePeriodPickerCarousel";
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
import "./TasksStatistic.css";

class TasksStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskStatisticList: []
    };
  }

  //Получение статистики за нужный период
  getTaskStatisticByPeriod(dateFrom, dateTo, callback) {
    getTaskStatisticByPeriod(dateFrom, dateTo, result => {
      if (typeof callback === "function") {
        this.setState({ taskStatisticList: result }, () => callback());
      } else {
        this.setState({ taskStatisticList: result });
      }
    });
  }

  getContent() {
    let content = [
      [
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Задача",
          width: 450
        },
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Категория",
          width: 300
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Время, всего",
          width: 120
        }
      ]
    ];

    this.state.taskStatisticList.forEach(taskStatistic => {
      content.push([
        {
          key: "name",
          type: "string",
          disabled: true,
          value: taskStatistic.name,
          style: taskStatistic.name_style
        },
        {
          key: "category_name",
          type: "string",
          disabled: true,
          value: taskStatistic.category_name,
          style: taskStatistic.category_name_style
        },
        {
          key: "type_id",
          type: "time",
          disabled: true,
          value: getTimeFromMins(taskStatistic.execution_time)
        }
      ]);
    });

    return content;
  }

  render() {
    return (
      <React.Fragment>
        <DatePeriodPickerCarousel
          onPickDate={(dateFrom, dateTo) =>
            this.getTaskStatisticByPeriod(dateFrom, dateTo)
          }
        />
        <Table isResizeble={false} isEditable={false}>
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

export default TasksStatistic;
