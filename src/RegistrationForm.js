import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import "./styles.css";

//Для ФИО текст, возраст цифры, почта по регэкспу

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      secondName: "",
      thirdName: "",
      age: "",
      email: "",
      nameValidate: "",
      secondNameValidate: "",
      thirdNameValidate: "",
      ageValidate: "",
      emailValidate: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderButton(value) {
    return <Button value={value} />;
  }

  onSubmit(event) {
    ////Регулярки для проверки полей
    //Поиск цифр
    const textReg = /[0-9]/g;
    //Валидация email
    const emailReg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    //Проверка имени
    if (textReg.test(this.state.name)) {
      this.setState({ nameValidate: "Должны быть только буквы" });
    } else {
      if (this.state.name === "") {
        this.setState({ nameValidate: "Имя должно быть заполнено!" });
      } else {
        this.setState({ nameValidate: "" });
      }
    }

    //Проверка фамилии
    if (textReg.test(this.state.secondName)) {
      this.setState({ secondNameValidate: "Должны быть только буквы" });
    } else {
      if (this.state.secondName === "") {
        this.setState({ secondNameValidate: "Фамилия должна быть заполнена!" });
      } else {
        this.setState({ secondNameValidate: "" });
      }
    }

    //Проверка отчества
    if (textReg.test(this.state.thirdName)) {
      this.setState({ thirdNameValidate: "Должны быть только буквы" });
    } else {
      if (this.state.thirdName === "") {
        this.setState({ thirdNameValidate: "Отчество должно быть заполнено!" });
      } else {
        this.setState({ thirdNameValidate: "" });
      }
    }

    //Проверка возраста
    if (this.state.age === "") {
      this.setState({ ageValidate: "Возраст должен быть заполнен!" });
    } else {
      if (!textReg.test(this.state.age)) {
        this.setState({ ageValidate: "Должны быть только цифры" });
      } else {
        this.setState({ ageValidate: "" });
      }
    }

    //Проверка email
    if (this.state.email === "") {
      this.setState({ emailValidate: "Email должен быть заполнен!" });
    } else {
      if (!emailReg.test(this.state.email)) {
        this.setState({ emailValidate: "Введите корректный email" });
      } else {
        this.setState({ emailValidate: "" });
      }
    }

    console.log("Имя: " + this.state.name);
    console.log("Фамилия: " + this.state.secondName);
    console.log("Отчество: " + this.state.thirdName);
    console.log("Возраст: " + this.state.age);
    console.log("Почта: " + this.state.email);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form">
        <h1 className="h1">Укажите ваши данные</h1>

        <InputField
          placeholder="Введите имя "
          name="name"
          value={this.state.name}
          onChange={event => this.onChange(event)}
          validate={this.state.nameValidate}
        />

        <InputField
          placeholder="Введите фамилию "
          name="secondName"
          value={this.state.secondName}
          onChange={event => this.onChange(event)}
          validate={this.state.secondNameValidate}
        />

        <InputField
          placeholder="Введите отчество "
          name="thirdName"
          value={this.state.thirdName}
          onChange={event => this.onChange(event)}
          validate={this.state.thirdNameValidate}
        />
        <InputField
          placeholder="Введите возраст "
          name="age"
          value={this.state.age}
          onChange={event => this.onChange(event)}
          validate={this.state.ageValidate}
        />
        <InputField
          placeholder="Введите почту "
          name="email"
          value={this.state.email}
          onChange={event => this.onChange(event)}
          validate={this.state.emailValidate}
        />
        {this.renderButton("ОТПРАВИТЬ")}
      </form>
    );
  }
}

export default RegistrationForm;
