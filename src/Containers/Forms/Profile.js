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
import { getInvalidMessagesAsObj, getUser } from "./UTILS";

const INPUTS = [email, password];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logoff(event) {
    event.preventDefault();
    this.props.onSubmit({}, false, false);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    console.log(event.name);

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.state)
      },
      () => {
        //Сохраняем только если ошибок нет
        //Да да, пока никуда кроме стора не отправляем
        if (Object.keys(this.state.validation).length === 0) {
          this.props.onSubmit(getUser(INPUTS, this.state), true, false);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <form onClick={event => event.stopPropagation()}>
          <h1 className="h1">Профиль</h1>
          {INPUTS.map(regInputs => (
            <Input
              placeholder={regInputs.placeholder}
              name={regInputs.name}
              type={regInputs.type}
              value={this.state[regInputs.name]}
              defaultValue={this.props.user[regInputs.name]}
              onChange={event => this.onChange(event)}
              invalidMessage={
                !!this.state.isTouched
                  ? this.state.validation[regInputs.name]
                  : ""
              }
            />
          ))}
          <Button
            isPrimary={true}
            value="Сохранить"
            onClick={event => this.onSubmit(event)}
          />
          <Button value="Выйти" onClick={event => this.logoff(event)} />
        </form>
      </div>
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
)(Profile);
