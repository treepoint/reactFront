import React from "react";
import Button from "../../../../../Components/Button/Button";
import DatePicker from "../../../../../Components/DatePicker/DatePicker";
import {
  getShortDayNameByID,
  getDDbyDate,
  getMMbyDate,
  getFormatDate,
  revokeDays
} from "../../../../../Libs/TimeUtils";
import "./DayPicker.css";

class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
  }

  componentDidMount() {
    let date = new Date();

    this.setState({ date }, () => this.getDaysMenu());
  }

  componentDidUpdate() {
    this.getDaysMenu();
  }

  //Обрабатываем нажатие с кнопок
  onClick(event) {
    this.setState({ date: event.target.name });
    this.props.onChange(getFormatDate(event.target.name));
  }

  //Обрабатываем выбор в Date Picker
  onPickDate(date) {
    this.setState({ date: date });
    this.props.onChange(getFormatDate(date));
  }

  getDaysMenu() {
    let date;
    let daysMenu = [];
    let isPrimary = false;

    /* Если день до среды — показываем текущую неделю и прошлую.
     * Поскольку, вероятно, нас больше интересуют старые данные, а не новая неделя.
     * Если же наступила среда — показываем текущую неделю + следующую.
     */

    let currentDay = new Date().getDay();
    let from;
    let to;

    if (currentDay > 2) {
      from = -(12 - currentDay);
      to = 12 + from;
    } else {
      from = -(6 - currentDay);
      to = 6 + currentDay;
    }

    let background = "#fff";

    while (from < to) {
      date = new Date();
      date = new Date(revokeDays(date, from));

      //Субботу и воскресенье сделаем серыми, чтобы разграничивать недели
      if (date.getDay() === 6 || date.getDay() === 0) {
        background = "rgb(234, 234, 234)";
      } else {
        background = "#fff";
      }

      //Выделим выбранный день
      if (getFormatDate(this.state.date) === getFormatDate(date)) {
        isPrimary = true;
      } else {
        isPrimary = false;
      }

      //Добавим кнопки с датами
      daysMenu.unshift(
        <Button
          name={date}
          style={{
            width: "84px",
            background
          }}
          isPrimary={isPrimary}
          value={
            !!from
              ? getDDbyDate(date) +
                "." +
                getMMbyDate(date) +
                " " +
                getShortDayNameByID(date.getDay())
              : "Сегодня"
          }
          onClick={event => {
            this.onClick(event);
          }}
        ></Button>
      );

      from++;
    }

    //Добавим выбор любой даты
    daysMenu.unshift(
      <DatePicker
        onChange={date => this.onPickDate(date)}
        date={this.state.date}
        placeholderText="Указать дату"
        width="106"
      />
    );

    return daysMenu;
  }

  render() {
    return (
      <div className="dayPicker">
        {this.getDaysMenu().map(button => {
          return button;
        })}
      </div>
    );
  }
}

export default DayPicker;
