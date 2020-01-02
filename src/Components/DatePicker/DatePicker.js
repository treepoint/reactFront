import React from "react";
import "./DatePicker.css";

import DP from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
  }

  componentDidMount() {
    this.setState({ date: this.props.date });
  }

  onChange(date) {
    this.setState({ date });
    this.props.onChange(date);
  }

  render() {
    let className = "datePicker";
    let selected = null;

    if (this.props.date === this.state.date) {
      className = "datePicker chosen";
      selected = this.state.date;
    }

    return (
      <div style={{ width: this.props.width + "px", marginRight: "27px" }}>
        <DP
          locale="ru"
          className={className}
          placeholderText={this.props.placeholderText}
          selected={selected}
          onChange={date => this.onChange(date)}
          dateFormat="dd.MM.yyyy"
        />
      </div>
    );
  }
}

export default DatePicker;
