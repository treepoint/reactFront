import React from "react";
import { connect } from "react-redux";
import { email, password } from "./USER_INPUTS";
import {
  setUser,
  setUserLoginState,
  setModalWindowState
} from "../../Store/actions";

import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import AnchorModalWindow from "../AnchorModalWindow/AnchorModalWindow";
import Anchor from "../../Components/Anchor/Anchor";
import { login } from "../App/MODAL_WINDOWS";
import "./registration.css";

const INPUTS = [email, password];

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //Собираем пользователя
  getUser() {
    let values = {};
    INPUTS.forEach(input => {
      values[input.name] = this.state[input.name];
    });
    return values;
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
          this.props.onSubmit(this.getUser(), true, false);
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
        <div className="login">
          Уже есть учетная запись?{" "}
          <Anchor>
            <AnchorModalWindow value="Войти" modalWindowName={login} />
          </Anchor>
        </div>
        <Button value="ОТПРАВИТЬ" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (user, userLoginState, modalWindowState) => {
      dispatch(setUser(user));
      dispatch(setUserLoginState(userLoginState));
      dispatch(setModalWindowState(modalWindowState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
