import React from "react";
import Button from "../../../../../Components/Button/Button";
import Table from "../../../../../Components/Table/Table";
import { getTaskStatisticByPeriod } from "../../../../../APIController/APIController";
import DatePicker from "../../../../../Components/DatePicker/DatePicker";
import {
  revokeDays,
  addDays,
  getRussianFormatDate,
  getTimeFromMins,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  getFirstDayOfPreviousMonth,
  getLastDayOfPreviousMonth
} from "../../../../../Libs/TimeUtils";
import "./TaskStatistic.css";

class TaskStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskStatisticList: [],
      dateFrom: null,
      dateTo: null,
      currentPeriod: null
    };
  }

  componentDidMount() {
    //Подтянем статистику за нужный период
    this.setCurrentWeekDates();
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

  //При выборе даты "c"
  onPickFromDate(dateFrom) {
    this.setState({ dateFrom });
    //Подтянем статистику за нужный период
    this.getTaskStatisticByPeriod(dateFrom, this.state.dateTo);
  }

  //При выборе даты "до"
  onPickToDate(dateTo) {
    this.setState({ dateTo });
    //Подтянем статистику за нужный период
    this.getTaskStatisticByPeriod(this.state.dateFrom, dateTo);
  }

  setCurrentWeekDates() {
    //Получим текущую дату
    let currentDate = new Date();
    //Получим начало недели — понедельник
    let dateFrom = revokeDays(currentDate, currentDate.getDay() - 1);
    //Получим конец недели — воскресенье
    let dateTo = addDays(currentDate, 7 - currentDate.getDay());

    //Запишем в стейт
    this.setState({ dateFrom, dateTo });
    this.getTaskStatisticByPeriod(dateFrom, dateTo);
  }

  setCurrentMonthDates() {
    //Получим начало текущего месяца
    let dateFrom = getFirstDayOfCurrentMonth();
    //Получим конец текущего месяца
    let dateTo = getLastDayOfCurrentMonth();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo });
    this.getTaskStatisticByPeriod(dateFrom, dateTo);
  }

  setPreviousMonthDates() {
    //Получим начало текущего месяца
    let dateFrom = getFirstDayOfPreviousMonth();
    //Получим конец текущего месяца
    let dateTo = getLastDayOfPreviousMonth();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo });
    this.getTaskStatisticByPeriod(dateFrom, dateTo);
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
          value: "Время, всего",
          style: { width: 164 }
        }
      ]
    ];

    this.state.taskStatisticList.forEach(taskStatistic => {
      taskStatisticList.push([
        {
          key: "name",
          type: "string",
          disabled: false,
          value: taskStatistic.name,
          style: {}
        },
        {
          key: "type_id",
          type: "time",
          disabled: false,
          value: getTimeFromMins(taskStatistic.execution_time),
          style: {}
        }
      ]);
    });

    return taskStatisticList;
  }

  render() {
    return (
      <React.Fragment>
        <div className="datePickersContainer">
          <DatePicker
            placeholderText={getRussianFormatDate(this.state.dateFrom)}
            width="90"
            date={this.state.dateFrom}
            onChange={dateFrom => this.onPickFromDate(dateFrom)}
          />
          <DatePicker
            placeholderText={getRussianFormatDate(this.state.dateTo)}
            width="90"
            date={this.state.dateTo}
            onChange={dateTo => this.onPickToDate(dateTo)}
          />
          <Button
            value="Текущая неделя"
            onClick={() => this.setCurrentWeekDates()}
          />
          <Button
            value="Текущий месяц"
            onClick={() => this.setCurrentMonthDates()}
          />
          <Button
            value="Прошлый месяц"
            onClick={() => this.setPreviousMonthDates()}
          />
        </div>
        <Table
          isResizeble={false}
          isEditable={false}
          update={() =>
            this.getTaskStatisticByPeriod(
              this.state.dateFrom,
              this.state.dateTo
            )
          }
        >
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

export default TaskStatistic;
