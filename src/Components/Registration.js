import React from "react";
import Input from "../Elements/Input/Input";
import Button from "../Elements/Button/Button";
import REG_INPUTS from "./REG_INPUTS";
import "./Registration.css";

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
    //Выводим все существующее в консоль списком
    REG_INPUTS.forEach(item => {
      if (!!this.state[item.name]) {
        console.log(item.name + ":" + this.state[item.name]);
      }
    });

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
        validationFunctions={regInputs.validationFunctions}
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
