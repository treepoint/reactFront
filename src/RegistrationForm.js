import React from "react";
import InputField from "./InputField";
import Button from "./Button";

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

  renderInput(placeholder, name, value, onChange, validate) {
    var borderColor = "rgba(216, 216, 216, 0.56)";

    if (validate !== "") {
      borderColor = "rgba(175, 4, 4, 0.63)";
    }

    return (
      <InputField
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        validate={validate}
        borderColor={borderColor}
      />
    );
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
      <form
        onSubmit={this.onSubmit}
        style={{
          textAlign: "center",
          width: "260px",
          margin: "auto",
          border: "1px solid rgba(70, 132, 156, 0.49)",
          padding: "10px",
          borderRadius: "4px",
          marginTop: "200px",
          boxShadow: "0px 4px 8px #cecdcd"
        }}
      >
        <h1>Укажите ваши данные</h1>
        {this.renderInput(
          "Введите имя ",
          "name",
          this.state.name,
          event => this.onChange(event),
          this.state.nameValidate
        )}
        {this.renderInput(
          "Введите фамилию ",
          "secondName",
          this.state.secondName,
          event => this.onChange(event),
          this.state.secondNameValidate
        )}
        {this.renderInput(
          "Введите отчество ",
          "thirdName",
          this.state.thirdName,
          event => this.onChange(event),
          this.state.thirdNameValidate
        )}
        {this.renderInput(
          "Введите возраст ",
          "age",
          this.state.age,
          event => this.onChange(event),
          this.state.ageValidate
        )}
        {this.renderInput(
          "Введите почту ",
          "email",
          this.state.email,
          event => this.onChange(event),
          this.state.emailValidate
        )}

        {this.renderButton("ОТПРАВИТЬ")}
      </form>
    );
  }
}

export default RegistrationForm;
