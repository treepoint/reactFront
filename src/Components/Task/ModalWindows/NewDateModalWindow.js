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
} from "../../../Libs/TimeUtils";
//CSS
import "./NewDateModalWindow.css";

class NewDateModalWindow extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      movedDate: null,
      //Значения ниже — просто кешируем, чтобы постоянно не дергать вычисления
      yesterday: null,
      nextMonday: null,
      nextMonthFirstDay: null,
    };
  }

  componentDidMount() {
    let today = new Date();

    //Посчитаем завтра
    this.setState({
      yesterday: addDays(today, 1),
      movedDate: addDays(today, 1),
    });
    //Посчитаем следующий понедельник
    this.setState({ nextMonday: getFirstDayOfNextWeek() });
    //Посчитаем следующее первое число
    this.setState({ nextMonthFirstDay: getFirstDayOfNextMonth() });
  }

  componentDidUpdate(prevState) {
    if (this.state.movedDate !== prevState.movedDate) {
      this.props.setState({ movedDate: this.state.movedDate });
    }
  }

  isDatesAreEqual(firstDate, secondDate) {
    if (firstDate === secondDate) {
      return true;
    }
    return false;
  }

  getPeriodCarousel() {
    let radioButtonItems = [];

    radioButtonItems.push({
      key: 1,
      isPrimary: this.isDatesAreEqual(
        this.state.movedDate,
        this.state.yesterday
      ),
      value: "Завтра",
      onClick: () => this.setState({ movedDate: this.state.yesterday }),
    });

    radioButtonItems.push({
      key: 1,
      isPrimary: this.isDatesAreEqual(
        this.state.movedDate,
        this.state.nextMonday
      ),
      value: "Следующий понедельник",
      onClick: () => this.setState({ movedDate: this.state.nextMonday }),
    });

    radioButtonItems.push({
      key: 2,
      isPrimary: this.isDatesAreEqual(
        this.state.movedDate,
        this.state.nextMonthFirstDay
      ),
      value: "Следующее первое число",
      onClick: () => this.setState({ movedDate: this.state.nextMonthFirstDay }),
    });

    return radioButtonItems;
  }

  /*
   * Модалка для переноса задачи на другую дату
   */
  render() {
    return (
      <ConfirmModalWindow
        title="Перенести задачу на другую дату?"
        message="Задача будет перемещена на указанную дату, отмеченные трудозатраты останутся"
        onCancel={() =>
          this.props.setState({ isNewDateModalWindowHidden: true })
        }
        onConfirm={() => this.props.moveTask()}
        confirmButtonLable="Перенести"
        isConfirmButtonDisabled={!!this.props.movedDate ? false : true}
      >
        <div className="CHOOSE_YOUR_DESTINY">
          <RadioButtonCarousel items={this.getPeriodCarousel()} />
        </div>
        или
        <div className="moveDatePicker">
          <DatePickerButton
            date={this.state.movedDate}
            onChange={(date) => this.setState({ movedDate: date })}
            placeholderText="Выберите дату"
            width={105}
          />
        </div>
      </ConfirmModalWindow>
    );
  }
}

export default NewDateModalWindow;
