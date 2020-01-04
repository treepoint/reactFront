import React from "react";
import DatePicker from "../DatePicker/DatePicker";
import "./DatePeriodPicker.css";

class DatePeriodPicker extends React.Component {
  //При выборе даты "c"
  onPickDateFrom(dateFrom) {
    this.props.onPickDateFrom(dateFrom);
  }

  //При выборе даты "до"
  onPickDateTo(dateTo) {
    this.props.onPickDateTo(dateTo);
  }

  render() {
    return (
      <div className="datePeriodPicker">
        <DatePicker
          placeholderText={this.props.placeholderTextDateFrom}
          width={this.props.width}
          date={this.props.dateFrom}
          onChange={dateFrom => this.onPickDateFrom(dateFrom)}
        />
        <DatePicker
          placeholderText={this.props.placeholderTextDateTo}
          width={this.props.width}
          date={this.props.dateTo}
          onChange={dateTo => this.onPickDateTo(dateTo)}
        />
      </div>
    );
  }
}

export default DatePeriodPicker;
