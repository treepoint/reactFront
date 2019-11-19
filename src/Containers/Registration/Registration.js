import React from "react";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import REG_INPUTS from "./REG_INPUTS";
import "./Registration.css";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Собираем значения в объект
  getValuesAsObj() {
    let values = {};
    REG_INPUTS.forEach(input => {
      values[input.name] = this.state[input.name];
    });
    return values;
  }

  //Собираем значения валидации в ассоциативный массив
  getInvalidMessagesAsObj() {
    let validation = {};

    REG_INPUTS.forEach(input => {
      input.validationFunctions
        .map(func => func.getInvalidMessage(this.state[input.name]))
        .filter(value => {
          if (value !== "") return (validation[input.name] = value);
        });

      return validation;
    });

    return validation;
  }

  onSubmit(event) {
    //Отключаем стандартный обработчик данного события
    event.preventDefault();

    this.setState(
      { isTouched: true, validation: this.getInvalidMessagesAsObj() },
      () => {
        //Шлем в консоль только если ошибок нет
        if (Object.keys(this.state.validation).length === 0) {
          console.log(this.getValuesAsObj());
        }
      }
    );
  }

  render() {
    return (
      <form onSubmit={event => this.onSubmit(event)} className="Registration">
        <h1 className="h1">Расскажи о себе</h1>
        {REG_INPUTS.map(regInputs => (
          <Input
            placeholder={regInputs.placeholder}
            name={regInputs.name}
            value={this.state[regInputs.name]}
            defaultValue={regInputs.defaultValue}
            onChange={event => this.onChange(event)}
            invalidMessage={
              !!this.state.isTouched
                ? this.state.validation[regInputs.name]
                : ""
            }
          />
        ))}
        <Button value="ОТПРАВИТЬ" />
      </form>
    );
  }
}

export default Registration;
