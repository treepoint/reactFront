import React from "react";
import DatePicker from "./DatePicker/DatePicker";
import calendarIcon from "../../Images/icon_calendar.png";
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
          className="datePicker left"
          placeholderText={this.props.placeholderTextDateFrom}
          width={this.props.width}
          date={this.props.dateFrom}
          onChange={dateFrom => this.onPickDateFrom(dateFrom)}
        />
        <DatePicker
          className="datePicker right"
          placeholderText={this.props.placeholderTextDateTo}
          width={this.props.width + 21}
          date={this.props.dateTo}
          onChange={dateTo => this.onPickDateTo(dateTo)}
        />
        <div
          className="datePeriodPickerCalendarIcon"
          style={{
            background:
              "url(" + calendarIcon + ") no-repeat scroll 100% 0 transparent",
            backgroundSize: "20px 20px"
          }}
        />
      </div>
    );
  }
}

export default DatePeriodPicker;
