import React from "react";
import { connect } from "react-redux";
import { email, password } from "./USER_INPUTS";
import {
  setUserEmail,
  setUserPassword,
  setRegistrationWindowState
} from "../../Store/actions";

import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

const INPUTS = [email, password];

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Собираем значения валидации в объект
  getInvalidMessagesAsObj() {
    let validation = {};

    INPUTS.forEach(input => {
      input.validationFunctions
        .map(func => func.getInvalidMessage(this.state[input.name]))
        .filter(value => {
          if (value !== "") return (validation[input.name] = value);
          return null;
        });

      return validation;
    });

    return validation;
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState(
      { isTouched: true, validation: this.getInvalidMessagesAsObj() },
      () => {
        //Сохраняем только если ошибок нет
        if (Object.keys(this.state.validation).length === 0) {
          this.props.onSubmit(this.state.email, this.state.password, false);
        }
      }
    );
  }

  render() {
    return (
      <form
        onSubmit={event => this.onSubmit(event)}
        onClick={event => event.stopPropagation()}
      >
        <h1 className="h1">Регистрация</h1>
        {INPUTS.map(regInputs => (
          <Input
            placeholder={regInputs.placeholder}
            name={regInputs.name}
            type={regInputs.type}
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

const mapStateToProps = state => {
  return {
    userEmail: state.userEmail,
    userPassword: state.userPassword,
    isRegistrationModalWindowActive: state.registrationWindowState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (userEmail, userPassword, isRegistrationModalWindowActive) => {
      dispatch(setUserEmail(userEmail));
      dispatch(setUserPassword(userPassword));
      dispatch(setRegistrationWindowState(isRegistrationModalWindowActive));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
