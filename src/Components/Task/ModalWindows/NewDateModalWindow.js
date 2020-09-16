import React from "react";
//Компоненты
import ConfirmModalWindow from "../../ConfirmModalWindow/ConfirmModalWindow";
import DatePickerButton from "../../DatePickerButton/DatePickerButton";
import RadioButtonCarousel from "../../RadioButtonCarousel/RadioButtonCarousel";
//Утилиты
import {
  addDays,
  getFirstDayOfNextMonth,
  getFirstDayOfNextWeek,
  getFormatDate
} from "../../../Libs/TimeUtils";
//CSS
import "./NewDateModalWindow.css";

class NewDateModalWindow extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      movedDate: null,
      //Значения ниже — просто кешируем, чтобы постоянно не дергать вычисления
      today: null,
      yesterday: null,
      nextMonday: null,
      nextMonthFirstDay: null
    };
  }

  componentDidMount() {
    let today = new Date();

    //Выставим дату на сегодня
    this.setState({ today: getFormatDate(today) });

    //Посчитаем завтра
    this.setState({ yesterday: getFormatDate(addDays(today, 1)) });

    //Посчитаем следующий понедельник
    this.setState({ nextMonday: getFormatDate(getFirstDayOfNextWeek()) });

    //Посчитаем следующее первое число
    this.setState({
      nextMonthFirstDay: getFormatDate(getFirstDayOfNextMonth())
    });

    //Выставим дату по умолчанию для перемещения. У нас всего два варианта,
    //если текущая дата = сегодня, то по умолчанию перенос на завтра.
    //Если дата != сегодня, значит сегодня
    if (this.props.currentTaskDate === getFormatDate(today)) {
      this.setState({ movedDate: addDays(today, 1) });
    } else {
      this.setState({ movedDate: today });
    }
  }

  //Если дата задачи изменилась — обновим её здесь
  componentDidUpdate(prevState) {
    if (this.state.movedDate !== prevState.movedDate) {
      this.props.setState({ movedDate: this.state.movedDate });
    }
  }

  isDatesAreEqual(firstDate, secondDate) {
    if (getFormatDate(firstDate) === getFormatDate(secondDate)) {
      return true;
    }
    return false;
  }

  //Собираем карусель из предполагаемых для переноса дат
  getPeriodCarousel() {
    let radioButtonItems = [];

    //Если текущая дата уже сегодня — не показываем эту кнопку
    if (this.props.currentTaskDate !== this.state.today) {
      radioButtonItems.push({
        key: 1,
        isPrimary: this.isDatesAreEqual(this.state.movedDate, this.state.today),
        value: "Сегодня",
        onClick: () => this.setState({ movedDate: this.state.today })
      });
    }

    //Если текущая дата уже завтра — не показываем эту кнопку
    if (this.props.currentTaskDate !== this.state.yesterday) {
      radioButtonItems.push({
        key: 2,
        isPrimary: this.isDatesAreEqual(
          this.state.movedDate,
          this.state.yesterday
        ),
        value: "Завтра",
        onClick: () => this.setState({ movedDate: this.state.yesterday })
      });
    }

    //Если текущая дата уже следующий понедельник — не показываем эту кнопку
    if (this.props.currentTaskDate !== this.state.nextMonday) {
      radioButtonItems.push({
        key: 3,
        isPrimary: this.isDatesAreEqual(
          this.state.movedDate,
          this.state.nextMonday
        ),
        value: "Следующий понедельник",
        onClick: () => this.setState({ movedDate: this.state.nextMonday })
      });
    }

    //Если текущая дата уже следующее первое число — не показываем эту кнопку
    if (this.props.currentTaskDate !== this.state.nextMonthFirstDay) {
      radioButtonItems.push({
        key: 4,
        isPrimary: this.isDatesAreEqual(
          this.state.movedDate,
          this.state.nextMonthFirstDay
        ),
        value: "Следующее первое число",
        onClick: () =>
          this.setState({ movedDate: this.state.nextMonthFirstDay })
      });
    }

    return radioButtonItems;
  }

  /*
   * Модалка для переноса задачи на другую дату
   */
  render() {
    return (
      <ConfirmModalWindow
        title="Перенести задачу на другую дату?"
        message="Задача будет перемещена на указанную дату, уже отмеченные трудозатраты останутся"
        onCancel={() =>
          this.props.setState({ isNewDateModalWindowHidden: true })
        }
        onConfirm={() => this.props.moveTask()}
        confirmButtonLable="Перенести"
        isConfirmButtonDisabled={!!this.props.movedDate ? false : true}
      >
        <div className="chooseNewTaskDateCarousel">
          <RadioButtonCarousel items={this.getPeriodCarousel()} />
        </div>
        или
        <div className="moveDatePicker">
          <DatePickerButton
            date={this.state.movedDate}
            onChange={date => this.setState({ movedDate: date })}
            placeholderText="Выберите дату"
            width={105}
          />
        </div>
      </ConfirmModalWindow>
    );
  }
}

export default NewDateModalWindow;
