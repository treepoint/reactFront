import React from "react";
import Dropzone from "react-dropzone";
//Подключаем redux
import { connect } from "react-redux";
import { setModalWindowState } from "../../Store/actions/globalModalWindow";
import { updateWallpapers } from "../../Store/actions/userSettings";
import { setCurrentUser, updateProfile } from "../../Store/actions/currentUser";
import { login, logoff } from "../../Store/actions/app";

//Импортируем компоненты
import Button from "../../Components/Button/Button";
import Lable from "../../Components/Lable/Lable";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Input from "../../Components/Input/Input";
//Подрубаем вспомогательную функциональность
import { email, password } from "./USER_INPUTS";
import { getInvalidMessagesAsObj } from "./FormsUtils";
//CSS
import "./Settings.css";

//Массив инпутов, на основании которого будем отрисовывать форму
const INPUTS = [email, password];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: [],
      backgroundImageMessage:
        "Перетащите png или jpg файл или кликните для выбора. Максимальный размер файла — 3 мегабайта.",
      user: this.props.currentUser,
      validation: {},
      isTouched: false
    };
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
          this.props.updateProfile(this.state.user);
        }
      }
    );
  }

  onDrop(acceptedFiles) {
    if (typeof acceptedFiles[0] === "undefined") {
      this.setState({
        backgroundImageMessage:
          "Файл не поддерживается. Попробуйте другой файл."
      });
    } else {
      this.props.updateWallpapers(acceptedFiles[0]);
      this.setState({ backgroundImageMessage: "Файл успешно загружен!" });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="h1">Настройки</h1>
        <Lable>Профиль</Lable>
        <form onClick={event => event.stopPropagation()}>
          {INPUTS.map(inputs => (
            <Input
              placeholder={inputs.placeholder}
              label={inputs.label}
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
          <ErrorMessage message={this.props.updateProfileError} />
          <Lable>Обои</Lable>
          <Dropzone
            onDrop={acceptedFiles => this.onDrop(acceptedFiles)}
            accept="image/png, image/jpeg"
            minSize={0}
            maxSize={3145728}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className="loadWallpapersBox" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p className="loadBackgroundArea">
                    {this.state.backgroundImageMessage}
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
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
    currentUser: state.currentUser,
    token: state.token,
    authError: state.authError,
    userSettings: state.userSettings,
    updateProfileError: state.updateProfileError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => {
      dispatch(setCurrentUser(user));
    },
    login: () => {
      dispatch(login());
    },
    setModalWindowState: boolean => {
      dispatch(setModalWindowState(boolean));
    },
    updateWallpapers: file => {
      dispatch(updateWallpapers(file));
    },
    logoff: () => {
      dispatch(logoff());
    },
    updateProfile: user => dispatch(updateProfile(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
