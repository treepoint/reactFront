import React from "react";
import { connect } from "react-redux";
import { email, password } from "./USER_INPUTS";
import { setUser, setToken, setModalWindowState } from "../../Store/actions";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { getInvalidMessagesAsObj } from "./Utils";
import { updateUser } from "../../APIController/APIController";
import { delete_cookie } from "sfcookies";

const INPUTS = [email, password];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  onChange(event) {
    let newUser = { [event.target.name]: event.target.value };

    this.setState({ user: Object.assign(this.state.user, newUser) });
  }

  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  logoff(event) {
    event.preventDefault();
    delete_cookie("token");
    delete_cookie("refresh_token");
    delete_cookie("user_id");
    this.props.onSubmit({}, false, false);
  }

  saveProfile(event) {
    event.preventDefault();
    this.setState(
      {
        isTouched: true,
        validation: getInvalidMessagesAsObj(INPUTS, this.state.user)
      },
      () => {
        //Сохраняем только если ошибок нет
        if (Object.keys(this.state.validation).length === 0) {
          //Отправляем в стор
          this.props.onSubmit(this.state.user, true, false);

          //Обновляем пользователя в базе
          updateUser(this.state.user.id, this.state.user);
        }
      }
    );
  }

  render() {
    return (
      <div>
        <form onClick={event => event.stopPropagation()}>
          <h1 className="h1">Профиль</h1>
          {INPUTS.map(inputs => (
            <Input
              placeholder={inputs.placeholder}
              name={inputs.name}
              type={inputs.type}
              value={this.state.user[inputs.name]}
              defaultValue={this.props.user[inputs.name]}
              onChange={event => this.onChange(event)}
              invalidMessage={
                !!this.state.isTouched ? this.state.validation[inputs.name] : ""
              }
            />
          ))}
          <Button
            isPrimary={true}
            value="Сохранить"
            onClick={event => this.saveProfile(event)}
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
    onSubmit: (user, token, modalWindowState) => {
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setModalWindowState(modalWindowState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
