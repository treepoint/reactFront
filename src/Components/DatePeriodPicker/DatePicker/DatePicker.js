import React from "react";
import DP from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "./DatePicker.css";

registerLocale("ru", ru);

class DatePicker extends React.PureComponent {
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
    let className = this.props.className;
    let selected = null;

    if (this.props.date === this.state.date) {
      className += " chosen";
    }

    selected = this.props.date;

    return (
      <div style={{ width: this.props.width + "px", marginRight: "15px" }}>
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
