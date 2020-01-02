import React from "react";
import Table from "../../../Components/Table/Table";
import { getTaskStatisticByPeriod } from "../../../APIController/APIController";
import DatePicker from "../../../Components/DatePicker/DatePicker";
import { revokeDays, addDays, getFormatDate } from "../../../Libs/TimeUtils";
import "./TaskStatistic.css";

class TaskStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskStatisticList: [], dateFrom: null, dateTo: null };
  }

  componentDidMount() {
    let currentDate = new Date();
    let dateFrom = getFormatDate(
      revokeDays(currentDate, currentDate.getDay() - 1)
    );

    let dateTo = getFormatDate(addDays(currentDate, 7 - currentDate.getDay()));

    this.setState({ dateFrom, dateTo });

    getTaskStatisticByPeriod(dateFrom, dateTo);
  }

  getTaskStatisticByPeriod(dateFrom, dateTo, callback) {
    let promise = getTaskStatisticByPeriod(dateFrom, dateTo);

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ taskStatisticList: result }, () => callback());
        } else {
          this.setState({ taskStatisticList: result });
        }
      }
    });
  }

  getContent() {
    let taskStatisticList = [
      [
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Задача",
          style: { width: 500 }
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Время выполнения",
          style: { width: 164 }
        }
      ]
    ];

    /* this.state.taskStatusesList.forEach(taskStatus => {
      //Соберем список типов статусов
      let taskStatusesTypesList = this.state.taskStatusesTypesList.map(
        taskStatusType => {
          return { value: taskStatusType.id, children: taskStatusType.name };
        }
      );

      //добавим текущую
      let taskStatusesTypes = {
        list: taskStatusesTypesList,
        current: taskStatus.type_id
      };

      taskStatusesList.push([
        {
          key: "id",
          type: "hidden",
          disabled: true,
          value: taskStatus.id,
          style: {}
        },
        {
          key: "name",
          type: "string",
          disabled: false,
          value: taskStatus.name,
          style: {}
        },
        {
          key: "type_id",
          type: "select",
          disabled: false,
          value: taskStatusesTypes,
          style: {}
        }
      ]);
    }); */

    return taskStatisticList;
  }

  render() {
    return (
      <React.Fragment>
        <div className="datePickersContainer">
          <DatePicker
            placeholderText="Дата начала"
            width="144"
            chosenDate={this.state.dateFrom}
          />
          <DatePicker
            placeholderText="Дата завершения"
            width="144"
            chosenDate={this.state.dateTo}
          />
        </div>
        <Table
          isResizeble={false}
          isEditable={false}
          update={() => this.getAllTaskStatuses()}
        >
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

export default TaskStatistic;
