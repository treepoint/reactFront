import React from "react";
import RadioButtonCarousel from "../RadioButtonCarousel/RadioButtonCarousel";
import DatePeriodPicker from "../DatePeriodPicker/DatePeriodPicker";
import {
  getRussianFormatDate,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  getFirstDayOfPreviousMonth,
  getLastDayOfPreviousMonth,
  getFirstDayOfCurrentWeek,
  getLastDayOfCurrentWeek
} from "../../Libs/TimeUtils";
import "./DatePeriodPickerCarousel.css";

class DatePeriodPickerCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: null,
      dateTo: null,
      currentPeriod: {}
    };
  }

  componentDidMount() {
    //Подтянем статистику за нужный период
    this.setCurrentWeekDates();
  }

  //При выборе даты "c"
  onPickDateFrom(dateFrom) {
    this.setState({ dateFrom, currentPeriod: { custom: true } });
    this.props.onPickDate(dateFrom, this.state.dateTo);
  }

  //При выборе даты "до"
  onPickDateTo(dateTo) {
    this.setState({ dateTo, currentPeriod: { custom: true } });
    this.props.onPickDate(this.state.dateFrom, dateTo);
  }

  setCurrentWeekDates() {
    //Получим начало недели — понедельник
    let dateFrom = getFirstDayOfCurrentWeek();
    //Получим конец недели — воскресенье
    let dateTo = getLastDayOfCurrentWeek();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo, currentPeriod: { currentWeak: true } });
    this.props.onPickDate(dateFrom, dateTo);
  }

  setCurrentMonthDates() {
    //Получим начало текущего месяца
    let dateFrom = getFirstDayOfCurrentMonth();
    //Получим конец текущего месяца
    let dateTo = getLastDayOfCurrentMonth();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo, currentPeriod: { currentMonth: true } });
    this.props.onPickDate(dateFrom, dateTo);
  }

  setPreviousMonthDates() {
    //Получим начало текущего месяца
    let dateFrom = getFirstDayOfPreviousMonth();
    //Получим конец текущего месяца
    let dateTo = getLastDayOfPreviousMonth();

    //Запишем в стейт
    this.setState({ dateFrom, dateTo, currentPeriod: { previousMonth: true } });
    this.props.onPickDate(dateFrom, dateTo);
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
      <div className="datePeriodPickerCarousel">
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
    );
  }
}

export default DatePeriodPickerCarousel;
