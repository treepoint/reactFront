import React from "react";
import RadioButtonCarousel from "../../../../Components/RadioButtonCarousel/RadioButtonCarousel";
import Table from "../../../../Components/Table/Table";
import { getCategoriesStatisticByPeriod } from "../../../../APIController/APIController";
import DatePeriodPicker from "../../../../Components/DatePeriodPicker/DatePeriodPicker";
import {
  getRussianFormatDate,
  getTimeFromMins,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  getFirstDayOfPreviousMonth,
  getLastDayOfPreviousMonth,
  getFirstDayOfCurrentWeek,
  getLastDayOfCurrentWeek
} from "../../../../Libs/TimeUtils";
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
  onPickDateFrom(dateFrom) {
    this.setState({ dateFrom });
    //Подтянем статистику за нужный период
    this.getCategoriesStatisticByPeriod(dateFrom, this.state.dateTo);

    this.setState({ currentPeriod: { custom: true } });
  }

  //При выборе даты "до"
  onPickDateTo(dateTo) {
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
          disabled: true,
          value: taskStatistic.name,
          style: {}
        },
        {
          key: "type_id",
          type: "time",
          disabled: true,
          value: getTimeFromMins(taskStatistic.execution_time),
          style: {}
        }
      ]);
    });

    return content;
  }

  getPeriodCarousel() {
    let radioButtonItems = [];

    radioButtonItems.push({
      key: 1,
      isPrimary: !!this.state.currentPeriod.currentWeak ? true : false,
      value: "Текущая неделя",
      onClick: event => this.setCurrentWeekDates(event)
    });

    radioButtonItems.push({
      key: 2,
      isPrimary: !!this.state.currentPeriod.currentMonth ? true : false,
      value: "Текущий месяц",
      onClick: event => this.setCurrentMonthDates(event)
    });

    radioButtonItems.push({
      key: 3,
      isPrimary: !!this.state.currentPeriod.previousMonth ? true : false,
      value: "Прошлый месяц",
      onClick: event => this.setPreviousMonthDates(event)
    });
    return radioButtonItems;
  }

  render() {
    return (
      <React.Fragment>
        <div className="tasksDatePickersContainer">
          <RadioButtonCarousel items={this.getPeriodCarousel()} />
          <DatePeriodPicker
            width={90}
            placeholderTextDateFrom={getRussianFormatDate(this.state.dateFrom)}
            dateFrom={this.state.dateFrom}
            onPickDateFrom={dateFrom => this.onPickDateFrom(dateFrom)}
            placeholderTextDateTo={getRussianFormatDate(this.state.dateTo)}
            dateTo={this.state.dateTo}
            onPickDateTo={dateTo => this.onPickDateTo(dateTo)}
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
