import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { updateUser } from "../../Store/actions/user";
import { logoff } from "../../Store/actions/app";
//Импортируем компоненты
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
//Подрубаем вспомогательную функциональность
import { email, password } from "./USER_INPUTS";
import { getInvalidMessagesAsObj } from "./FormsUtils";

//Массив инпутов, на основании которого будем отрисовывать форму
const INPUTS = [email, password];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user, validation: {}, isTouched: false };
  }

  onChange(event) {
    let user = { [event.target.name]: event.target.value };
    this.setState({ user: Object.assign({}, this.state.user, user) });
  }

  logoff(event) {
    event.preventDefault();
    this.props.logoff();
  }

  updateUser(event) {
    event.preventDefault();

    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.state.user)
      },
      () => {
        //Переходим к обновлению если ошибок нет
        if (
          Object.keys(getInvalidMessagesAsObj(INPUTS, this.state.user))
            .length === 0
        ) {
          this.props.updateUser(this.state.user);
        }
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <form onClick={event => event.stopPropagation()}>
          <h1 className="h1">Профиль</h1>
          {INPUTS.map(inputs => (
            <Input
              placeholder={inputs.placeholder}
              name={inputs.name}
              type={inputs.type}
              value={this.state.user[inputs.name]}
              defaultValue={this.state.user[inputs.name]}
              onChange={event => this.onChange(event)}
              invalidMessage={
                !!this.state.isTouched ? this.state.validation[inputs.name] : ""
              }
            />
          ))}
          <ErrorMessage message={this.props.updateError} />
          <Button
            isPrimary={true}
            value="Сохранить"
            onClick={event => this.updateUser(event)}
          />
          <Button value="Выйти" onClick={event => this.logoff(event)} />
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    token: state.token,
    updateError: state.userUpdateError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoff: () => {
      dispatch(logoff());
    },
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
