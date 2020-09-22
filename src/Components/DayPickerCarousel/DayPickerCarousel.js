import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import RadioButtonCarousel from "../RadioButtonCarousel/RadioButtonCarousel";
import DatePickerButton from "../DatePickerButton/DatePickerButton";
//Утилиты
import {
  getFormatDate,
  revokeDays,
  getDDdotMMandShortDatNameByDate,
} from "../../Libs/TimeUtils";
//CSS
import "./DayPickerCarousel.css";

class DayPickerCarousel extends React.PureComponent {
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

  //Обрабатываем выбор в DatePicker
  onPickDate(date) {
    this.setState({ date: date });
    this.props.onChange(getFormatDate(date));
  }

  getDaysMenu() {
    let date;
    let dayId;
    let dayLable;
    let daysMenu = [];
    let isPrimary = false;
    let isHoliday = false;
    let today = new Date();

    let currentDay = new Date().getDay();
    let from;
    let to;

    /* Если день до среды — показываем текущую неделю и прошлую.
     * Поскольку, вероятно, нас больше интересуют старые данные, а не новая неделя.
     * Если же наступила среда — показываем текущую неделю + следующую.
     *
     * А для воскресенья вообще свой поворот
     */

    if (currentDay > 2) {
      from = -(12 - currentDay);
      to = 12 + from;
    } else if (currentDay === 0) {
      from = -(6 - 1);
      to = 6 + 1;
    } else {
      from = -(6 - currentDay);
      to = 6 + currentDay;
    }

    //В зависимости от ширины экрана покажем нужное количество дней
    let maxCount = 0;

    //Магически подобранные константы start
    maxCount = Math.floor((this.props.windowWidth - 155 - 120) / 85);

    let diff = maxCount - Math.abs(from) - Math.abs(to);

    from = from - Math.floor(diff / 2);
    to = to + Math.floor(diff / 2);

    while (from < to) {
      date = new Date(revokeDays(today, from));
      dayId = date.getDay();

      //Если сегодня — укажем это
      if (getFormatDate(this.state.date) === getFormatDate(date)) {
        isPrimary = true;
      } else {
        isPrimary = false;
      }

      //Выделим выходные
      if (dayId === 6 || dayId === 0) {
        isHoliday = true;
      } else {
        isHoliday = false;
      }

      dayLable = !!from ? getDDdotMMandShortDatNameByDate(date) : "Сегодня";

      //Добавим кнопки с датами
      daysMenu.unshift({
        name: date,
        key: from,
        isPrimary: isPrimary,
        isHoliday: isHoliday,
        value: dayLable,
        onClick: (event) => this.onClick(event),
      });

      from++;
    }

    return daysMenu;
  }

  render() {
    return (
      <div className="dayPickerCarousel">
        <div className="dayPickerCarouselContainer">
          <RadioButtonCarousel items={this.getDaysMenu()} isBorderless />
        </div>
        <DatePickerButton
          isBorderless={true}
          onChange={(date) => this.onPickDate(date)}
          date={this.state.date}
          placeholderText="Выбрать дату"
          width={100}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    nextDayAlreadyComesMessageShowDate: state.nextDayAlreadyComesMessageShowDate
  };
};

export default connect(mapStateToProps)(DayPickerCarousel);
