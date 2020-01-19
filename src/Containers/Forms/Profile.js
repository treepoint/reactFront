import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { setUser } from "../../Store/actions/user";
import { setToken } from "../../Store/actions/token";
import { setModalWindowState } from "../../Store/actions/globalModalWindow";
//Подключаем API
import { updateUser } from "../../APIController/APIController";
//Подключаем cookies
import { delete_cookie } from "../../Libs/Sfcookies";
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
    this.state = { user: this.props.user };
  }

  updateUserInState(event) {
    let user = { [event.target.name]: event.target.value };
    this.setState({ user: Object.assign(this.state.user, user) });
  }

  logoff(event) {
    event.preventDefault();
    //Удалим куки
    delete_cookie("token");
    delete_cookie("refresh_token");
    delete_cookie("user_id");
    //Очистим стор
    this.props.writeToStore({}, null);
    //Закроем модалку
    this.props.closeModalWindow();
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
          this.props.writeToStore(this.state.user, true, false);

          //Обновляем пользователя в базе
          updateUser(this.state.user, result => {
            //Если есть ошибки
            if (typeof result.response !== "undefined") {
              switch (result.response.status) {
                case 409:
                  this.setState({
                    errorMessage: "Такой email уже есть в базе"
                  });
                  break;
                default:
                  this.setState({
                    errorMessage: "Произошла неизвестная ошибка"
                  });
              }
            } else {
              //Просто закроем модалку
              this.props.closeModalWindow();
            }
          });
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
              defaultValue={this.props.user[inputs.name]}
              onChange={event => this.updateUserInState(event)}
              invalidMessage={
                !!this.state.isTouched ? this.state.validation[inputs.name] : ""
              }
            />
          ))}
          <ErrorMessage message={this.state.errorMessage} />
          <Button
            isPrimary={true}
            value="Сохранить"
            onClick={event => this.saveProfile(event)}
          />
          <Button value="Выйти" onClick={event => this.logoff(event)} />
        </form>
      </React.Fragment>
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
  mapStateToProps,
  mapDispatchToProps
)(Profile);
