import React from "react";
import DP from "react-datepicker";
import calendarIcon from "../../Images/icon_calendar.png";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "./DatePickerButton.css";

registerLocale("ru", ru);

class DatePickerButton extends React.PureComponent {
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

  //Имя класса
  getClassName() {
    let className = "datePickerButton";

    //Если передали дату — сравним совпадает ли выбранная с этой. Если да — выделим
    if (typeof this.props.date !== "undefined" && this.props.date !== null) {
      if (this.props.date === this.state.date) {
        className += " chosen";
      }
    }

    if (this.props.isBorderless) {
      className += " borderless";
    }

    return className;
  }

  //Состояние
  getSelected() {
    let selected = null;

    if (this.props.date === this.state.date) {
      selected = this.state.date;
    }

    return selected;
  }

  render() {
    return (
      <div style={{ width: this.props.width + 32 + "px", marginRight: "27px" }}>
        <DP
          locale="ru"
          className={this.getClassName()}
          placeholderText={this.props.placeholderText}
          selected={this.getSelected()}
          onChange={(date) => this.onChange(date)}
          dateFormat="dd.MM.yyyy"
        />
        <div
          className="datePickerButtonCalendarIcon"
          style={{
            background:
              "url(" + calendarIcon + ") no-repeat scroll 100% 0 transparent",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    );
  }
}

export default DatePickerButton;
