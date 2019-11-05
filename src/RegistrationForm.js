import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import "./styles.css";

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
    placeholder: "Введите имя",
    isValid: value =>
      !!value
        ? !numReg.test(value)
          ? ""
          : "В имени могут быть только буквы!"
        : "Имя должно быть заполнено!"
  },
  {
    name: "secondName",
    placeholder: "Введите фамилию",
    isValid: value =>
      !!value
        ? !numReg.test(value)
          ? ""
          : "В фамилии могут быть только буквы!"
        : "Фамилия должна быть заполнена!"
  },
  {
    name: "thirdName",
    placeholder: "Введите отчество",
    isValid: value =>
      !!value
        ? !numReg.test(value)
          ? ""
          : "В отчестве могут быть только буквы!"
        : "Отчество должно быть заполнено!"
  },
  {
    name: "age",
    placeholder: "Введите возраст",
    isValid: value =>
      !!value
        ? charReg.test(value)
          ? ""
          : "В возрасте могут быть только цифры!"
        : "Возраст должен быть заполнен!"
  },
  {
    name: "email",
    placeholder: "Введите email",
    isValid: value =>
      !!value
        ? emailReg.test(value)
          ? ""
          : "Введите корректный email!"
        : "Email должен быть заполнен!"
  }
];

class RegistrationForm extends React.Component {
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
      <InputField
        placeholder={regInputs.placeholder}
        name={regInputs.name}
        value={this.state[regInputs.name]}
        onChange={event => this.onChange(event)}
        isValid={regInputs.isValid}
      />
    ));

    return (
      <form onSubmit={this.onSubmit} className="form">
        <h1 className="h1">Укажите ваши данные</h1>
        {regInputs}
        <Button value="Отправить" />
      </form>
    );
  }
}

export default RegistrationForm;
