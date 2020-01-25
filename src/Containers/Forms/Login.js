import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setCurrentUser } from "../../Store/actions/currentUser";
import { login } from "../../Store/actions/app";
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
    this.state = { validation: {}, isTouched: false };
  }

  onChange(event) {
    let user = {
      email: this.props.currentUser.email,
      password: this.props.currentUser.password
    };

    user = Object.assign(user, { [event.target.name]: event.target.value });
    this.props.setCurrentUser(user);
  }

  login(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.props.currentUser)
      },
      () => {
        //Переходим к аутентификации если ошибок нет
        if (
          Object.keys(getInvalidMessagesAsObj(INPUTS, this.props.currentUser))
            .length === 0
        ) {
          this.props.login();
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
            value={this.props.currentUser[inputs.name]}
            defaultValue={inputs.defaultValue}
            onChange={event => this.onChange(event)}
            invalidMessage={
              !!this.state.isTouched ? this.state.validation[inputs.name] : ""
            }
          />
        ))}
        <ErrorMessage message={this.props.authError} />
        <Button
          isPrimary={true}
          value="Войти"
          onClick={event => this.login(event)}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    token: state.token,
    authError: state.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => {
      dispatch(setCurrentUser(user));
    },
    login: () => {
      dispatch(login());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
