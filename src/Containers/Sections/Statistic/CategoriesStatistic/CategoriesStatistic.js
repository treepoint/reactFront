import React from "react";
import Table from "../../../../Components/Table/Table";
import { getCategoriesStatisticByPeriod } from "../../../../APIController/APIController";
import DatePeriodPickerCarousel from "../../../../Components/DatePeriodPickerCarousel/DatePeriodPickerCarousel";
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
import "./CategoriesStatistic.css";

class TaskStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesStatisticList: []
    };
  }

  //Получение статистики за нужный период
  getCategoriesStatisticByPeriod(dateFrom, dateTo, callback) {
    getCategoriesStatisticByPeriod(dateFrom, dateTo, result => {
      if (typeof callback === "function") {
        this.setState({ categoriesStatisticList: result }, () => callback());
      } else {
        this.setState({ categoriesStatisticList: result });
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
          value: "Категория",
          width: 300
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Время, всего",
          width: 122
        }
      ]
    ];

    this.state.categoriesStatisticList.forEach(taskStatistic => {
      content.push([
        {
          key: "name",
          type: "string",
          disabled: true,
          value: taskStatistic.name,
          style: taskStatistic.name_style
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
            this.getCategoriesStatisticByPeriod(dateFrom, dateTo)
          }
        />
        <Table isResizeble={false} isEditable={false}>
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

export default TaskStatistic;
