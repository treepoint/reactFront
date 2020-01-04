import React from "react";
import Button from "../../../../../Components/Button/Button";
import Table from "../../../../../Components/Table/Table";
import { getCategoriesStatisticByPeriod } from "../../../../../APIController/APIController";
import DatePicker from "../../../../../Components/DatePicker/DatePicker";
import {
  getRussianFormatDate,
  getTimeFromMins,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  getFirstDayOfPreviousMonth,
  getLastDayOfPreviousMonth,
  getFirstDayOfCurrentWeek,
  getLastDayOfCurrentWeek
} from "../../../../../Libs/TimeUtils";
import "./CategoriesStatistic.css";

class TaskStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesStatisticList: [],
      dateFrom: null,
      dateTo: null,
      currentPeriod: {}
    };
  }

  componentDidMount() {
    //Подтянем статистику за нужный период
    this.setCurrentWeekDates();
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

  //При выборе даты "c"
  onPickFromDate(dateFrom) {
    this.setState({ dateFrom });
    //Подтянем статистику за нужный период
    this.getCategoriesStatisticByPeriod(dateFrom, this.state.dateTo);

    this.setState({ currentPeriod: { custom: true } });
  }

  //При выборе даты "до"
  onPickToDate(dateTo) {
    this.setState({ dateTo });
    //Подтянем статистику за нужный период
    this.getCategoriesStatisticByPeriod(this.state.dateFrom, dateTo);

    this.setState({ currentPeriod: { custom: true } });
  }

  setCurrentWeekDates() {
    //Получим начало недели — понедельник
    let dateFrom = getFirstDayOfCurrentWeek();
    //Получим конец недели — воскресенье
    let dateTo = getLastDayOfCurrentWeek();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo });
    this.getCategoriesStatisticByPeriod(dateFrom, dateTo);

    this.setState({ currentPeriod: { currentWeak: true } });
  }

  setCurrentMonthDates() {
    //Получим начало текущего месяца
    let dateFrom = getFirstDayOfCurrentMonth();
    //Получим конец текущего месяца
    let dateTo = getLastDayOfCurrentMonth();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo });
    this.getCategoriesStatisticByPeriod(dateFrom, dateTo);

    this.setState({ currentPeriod: { currentMonth: true } });
  }

  setPreviousMonthDates() {
    //Получим начало текущего месяца
    let dateFrom = getFirstDayOfPreviousMonth();
    //Получим конец текущего месяца
    let dateTo = getLastDayOfPreviousMonth();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo });
    this.getCategoriesStatisticByPeriod(dateFrom, dateTo);

    this.setState({ currentPeriod: { previousMonth: true } });
  }

  getContent() {
    let content = [
      [
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Категория",
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

    this.state.categoriesStatisticList.forEach(taskStatistic => {
      content.push([
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

    return content;
  }

  render() {
    return (
      <React.Fragment>
        <div className="categoriesDatePickersContainer">
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
            isPrimary={!!this.state.currentPeriod.currentWeak ? true : false}
          />
          <Button
            value="Текущий месяц"
            onClick={() => this.setCurrentMonthDates()}
            isPrimary={!!this.state.currentPeriod.currentMonth ? true : false}
          />
          <Button
            value="Прошлый месяц"
            onClick={() => this.setPreviousMonthDates()}
            isPrimary={!!this.state.currentPeriod.previousMonth ? true : false}
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
