import React from "react";
import { connect } from "react-redux";
import { email, password } from "./USER_INPUTS";
import { setUser, setToken, setModalWindowState } from "../../Store/actions";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { getInvalidMessagesAsObj } from "./Utils";
import { getToken } from "../../APIController/APIController";
import { bake_cookie } from "../../Cookies/Sfcookies";

const INPUTS = [email, password];

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  onChange(event) {
    let newUser = { [event.target.name]: event.target.value };

    this.setState({ user: Object.assign(this.state.user, newUser) });
  }

  onSuccess(user, token, refreshToken) {
    //Unixtime в обычное время
    let tokenExp = new Date(token.exp * 1000);

    //Unixtime в обычное время
    let refreshTokenExp = new Date(refreshToken.exp * 1000);

    bake_cookie("token", token.value, tokenExp);
    bake_cookie("refresh_token", refreshToken.value, refreshTokenExp);
    bake_cookie("user_id", user.id, tokenExp);

    this.props.writeToStore(user, token.value, false);
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
          let promise = getToken(this.state.user);
          //Если запрос выполнен успешно — пишем пользователя и токен в стор
          promise.then(result => {
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
            onChange={event => this.onChange(event)}
            invalidMessage={
              !!this.state.isTouched ? this.state.validation[inputs.name] : ""
            }
          />
        ))}
        <ErrorMessage message={this.state.errorMessage} />
        <Button
          isPrimary={true}
          value="ОТПРАВИТЬ"
          onClick={event => this.login(event)}
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
    writeToStore: (user, token, modalWindowState) => {
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setModalWindowState(modalWindowState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
