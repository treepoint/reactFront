import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setModalWindowName } from "../../Store/actions";
//Подключаем API
import { createUser } from "../../APIController/APIController";
//Подключаем модалки
import { login } from "../../Components/ModalWindow/MODAL_WINDOWS";
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
    this.state = { user: {}, errorMessage: "" };
  }

  updateUserInState(event) {
    let user = { [event.target.name]: event.target.value };
    this.setState({
      user: Object.assign(this.state.user, user)
    });
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
          //Создаем пользователя
          createUser(this.state.user, result => {
            //Если есть ошибки
            if (typeof result.response !== "undefined") {
              switch (result.response.status) {
                case 409:
                  this.setState({
                    errorMessage:
                      "Пользователь с таким email уже зарегистрирован"
                  });
                  break;
                default:
                  this.setState({
                    errorMessage: "Произошла неизвестная ошибка"
                  });
              }
            } else {
              //Открываем окно входа
              this.props.openLoginWindow();
            }
          });
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
            onChange={event => this.updateUserInState(event)}
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
        <ErrorMessage message={this.state.errorMessage} />
        <Button
          isPrimary={true}
          value="Отправить"
          onClick={event => this.createUser(event)}
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openLoginWindow: () => {
      dispatch(setModalWindowName(login));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Registration);
