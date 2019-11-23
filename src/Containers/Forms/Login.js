import React from "react";
import { connect } from "react-redux";
import { email, password } from "./USER_INPUTS";
import {
  setUser,
  setUserLoginState,
  setModalWindowState
} from "../../Store/actions";
import Input from "../../Components/Input/back/Input";
import Button from "../../Components/Button/back/Button";
import { getInvalidMessagesAsObj, getUser } from "./UTILS";

const INPUTS = [email, password];

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.state)
      },
      () => {
        //Сохраняем только если ошибок нет
        //Да да, пока никуда не отправляем. Можно считать, что это кривой мок
        if (Object.keys(this.state.validation).length === 0) {
          this.props.onSubmit(getUser(INPUTS, this.state), true, false);
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
        <h1 className="h1">Вход</h1>
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
        <Button isPrimary={true} value="ОТПРАВИТЬ" />
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
)(Login);
