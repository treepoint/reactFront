import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setCurrentUser, registration } from "../../Store/actions/currentUser";
//Подключаем модалки
import { login } from "../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
//Импортируем компоненты
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import AnchorModalWindow from "../../Components/AnchorModalWindow/AnchorModalWindow";
import Anchor from "../../Components/Anchor/Anchor";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
//Подрубаем вспомогательную функциональность
import { getInvalidMessagesAsObj } from "./FormsUtils";
import { email, password } from "./USER_INPUTS";
//Подключаем CSS
import "./Registration.css";

//Массив инпутов, на основании которого будем отрисовывать форму
const INPUTS = [email, password];

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isTouched: false, validation: {} };
  }

  onChange(event) {
    let user = {
      email: this.props.user.email,
      password: this.props.user.password
    };

    user = Object.assign(user, { [event.target.name]: event.target.value });
    this.props.setCurrentUser(user);
  }

  createUser(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.props.user)
      },
      () => {
        //Сохраняем только если ошибок нет
        if (Object.keys(this.state.validation).length === 0) {
          //Создаем пользователя
          this.props.registration(this.props.user);
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
            value={this.props.user[inputs.name]}
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
        <ErrorMessage message={this.props.registrationError} />
        <Button
          isPrimary={true}
          value="Отправить"
          onClick={event => this.createUser(event)}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    registrationError: state.registrationError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registration: () => {
      dispatch(registration());
    },
    setCurrentUser: user => {
      dispatch(setCurrentUser(user));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
