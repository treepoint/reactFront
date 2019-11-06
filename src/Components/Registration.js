import React from "react";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";
import "./Registration.css";

////Регулярки для проверки полей
//Поиск цифр
const numReg = /\d+/;
//Поиск цифр
const charReg = /^[0-9]+$/;
//Валидация email
const emailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const REG_INPUTS = [
  {
    name: "name",
    placeholder: "Твое имя",
    isValid: value =>
      !!value
        ? !numReg.test(value)
          ? ""
          : "В имени могут быть только буквы"
        : "Имя должно быть заполнено"
  },
  {
    name: "secondName",
    placeholder: "Фамилия",
    isValid: value =>
      !!value
        ? !numReg.test(value)
          ? ""
          : "В фамилии могут быть только буквы"
        : "Фамилия должна быть заполнена"
  },
  {
    name: "thirdName",
    placeholder: "Отчество",
    isValid: value =>
      !!value
        ? !numReg.test(value)
          ? ""
          : "В отчестве могут быть только буквы"
        : "Отчество должно быть заполнено"
  },
  {
    name: "age",
    placeholder: "Возраст",
    isValid: value =>
      !!value
        ? charReg.test(value)
          ? ""
          : "В возрасте могут быть только цифры"
        : "Возраст должен быть заполнен"
  },
  {
    name: "email",
    placeholder: "Email для связи",
    isValid: value =>
      !!value
        ? emailReg.test(value)
          ? ""
          : "Введите корректный email"
        : "Email должен быть заполнен"
  }
];

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    //Как по ТЗ — выводим все в консоль
    console.log(this.state);

    //Отключаем стандартный обработчик данного события
    event.preventDefault();
  }

  render() {
    var regInputs = REG_INPUTS.map(regInputs => (
      <Input
        placeholder={regInputs.placeholder}
        name={regInputs.name}
        value={this.state[regInputs.name]}
        onChange={event => this.onChange(event)}
        isValid={regInputs.isValid}
      />
    ));

    return (
      <form onSubmit={this.onSubmit} className="Registration">
        <h1 className="h1">Расскажи о себе</h1>
        {regInputs}
        <Button value="ОТПРАВИТЬ" />
      </form>
    );
  }
}

export default Registration;
