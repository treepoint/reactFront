import React from "react";
import Button from "../../../../Components/Button/Button";
import DatePicker from "./DatePicker/DatePicker";
import {
  getCurrentDate,
  getShortDayNameByID,
  getDDbyDate,
  getMMbyDate,
  getFormatDate
} from "../../../../Libs/TimeUtils";
import "./DayPicker.css";

class DayPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenDay: getCurrentDate() };
  }

  componentDidMount() {
    this.getDaysMenu();
  }

  componentDidUpdate() {
    this.getDaysMenu();
  }

  onClick(event) {
    this.setState({ chosenDay: getFormatDate(event.target.name) });
  }

  PickDate(date) {
    this.setState({ chosenDay: getFormatDate(date) });
  }

  getDaysMenu() {
    let date;
    let daysMenu = [];
    let isPrimary = false;

    let i = -6;

    while (i < 7) {
      date = new Date();
      date = new Date(date.setDate(date.getDate() - i));

      if (this.state.chosenDay === getFormatDate(date)) {
        isPrimary = true;
      } else {
        isPrimary = false;
      }

      //Добавим кнопки с датами
      daysMenu.unshift(
        <Button
          name={date}
          style={{
            width: "84px"
            /*   marginTop: "0px" */
          }}
          isPrimary={isPrimary}
          value={
            !!i
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

      i++;
    }

    //Добавим выбор любой даты
    daysMenu.unshift(
      <DatePicker
        onChange={date => this.PickDate(date)}
        chosenDay={this.state.chosenDay}
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
