import React from "react";
import { connect } from "react-redux";
import { email, password } from "./USER_INPUTS";
import { setModalWindowName } from "../../Store/actions";

import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import AnchorModalWindow from "../AnchorModalWindow/AnchorModalWindow";
import Anchor from "../../Components/Anchor/Anchor";
import { login } from "../App/MODAL_WINDOWS";
import "./Registration.css";
import { getInvalidMessagesAsObj } from "./Utils";
import { createUser } from "../../APIController/APIController";

const INPUTS = [email, password];

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  onChange(event) {
    let newUser = { [event.target.name]: event.target.value };

    this.setState({ user: Object.assign(this.state.user, newUser) });
  }

  createUser(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.state.user)
      },
      () => {
        //Сохраняем только если ошибок нет
        if (Object.keys(this.state.validation).length === 0) {
          //Пока пишем и в store
          this.props.onSuccess();

          //И в базу
          createUser(this.state.user);
        }
      }
    );
  }

  render() {
    return (
      <form onClick={event => event.stopPropagation()}>
        <h1 className="h1">Регистрация</h1>
        {INPUTS.map(inputs => (
          <Input
            placeholder={inputs.placeholder}
            name={inputs.name}
            type={inputs.type}
            value={this.state[inputs.name]}
            defaultValue={inputs.defaultValue}
            onChange={event => this.onChange(event)}
            invalidMessage={
              !!this.state.isTouched ? this.state.validation[inputs.name] : ""
            }
          />
        ))}
        <div className="login">
          Уже есть учетная запись?{" "}
          <Anchor>
            <AnchorModalWindow value="Войти" modalWindowName={login} />
          </Anchor>
        </div>
        <Button
          isPrimary={true}
          value="ОТПРАВИТЬ"
          onClick={event => this.createUser(event)}
        />
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
    onSuccess: () => {
      //Если успешно — просто открываем окно входа
      dispatch(setModalWindowName(login));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
