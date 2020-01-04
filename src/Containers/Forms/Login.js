import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setUser, setToken, setModalWindowState } from "../../Store/actions";
//Подключаем API
import { getToken } from "../../APIController/APIController";
//Подключаем cookies
import { bake_cookie } from "../../Libs/Sfcookies";
//Импортируем компоненты
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
//Подрубаем вспомогательную функциональность
import { email, password } from "./USER_INPUTS";
import { getInvalidMessagesAsObj } from "./FormsUtils";

//Массив инпутов, на основании которого будем отрисовывать форму
const INPUTS = [email, password];

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  updateUserInState(event) {
    let user = { [event.target.name]: event.target.value };
    this.setState({ user: Object.assign(this.state.user, user) });
  }

  login(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.state.user)
      },
      () => {
        //Переходим к аутентификации если ошибок нет
        if (Object.keys(this.state.validation).length === 0) {
          //Создаем токен
          getToken(this.state.user, result => {
            //Если есть ошибки
            if (typeof result.response !== "undefined") {
              switch (result.response.status) {
                case 404:
                  this.setState({
                    errorMessage:
                      "Пользователь с таким логином и паролем не найден"
                  });
                  break;
                default:
                  this.setState({
                    errorMessage: "Произошла неизвестная ошибка"
                  });
              }
            } else {
              //Создадим cookies, запишем в стор
              this.onSuccess(result.user, result.token, result.refreshToken);
            }
          });
        }
      }
    );
  }

  onSuccess(user, token, refreshToken) {
    //Unixtime в обычное время
    let tokenExp = new Date(token.exp * 1000);

    //Unixtime в обычное время
    let refreshTokenExp = new Date(refreshToken.exp * 1000);

    //Пишем куки
    bake_cookie("token", token.value, tokenExp);
    bake_cookie("refresh_token", refreshToken.value, refreshTokenExp);
    bake_cookie("user_id", user.id, tokenExp);

    //Пишем в стор
    this.props.writeToStore(user, token.value);
    //Закрываем модалку
    this.props.closeModalWindow();
  }

  render() {
    return (
      <form onClick={event => event.stopPropagation()}>
        <h1 className="h1">Вход</h1>
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
        <ErrorMessage message={this.state.errorMessage} />
        <Button
          isPrimary={true}
          value="Войти"
          onClick={event => this.login(event)}
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    writeToStore: (user, token) => {
      dispatch(setUser(user));
      dispatch(setToken(token));
    },
    closeModalWindow: () => {
      dispatch(setModalWindowState(false));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
