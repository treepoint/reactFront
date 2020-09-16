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
import "./Form.css";

//Массив инпутов, на основании которого будем отрисовывать форму
const INPUTS = [email, password];

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: [],
      backgroundImageSizeByte: null,
      backgroundImageMessage: null,
      user: this.props.currentUser,
      validation: {},
      isTouched: false
    };
  }

  componentDidMount() {
    //Задаем максимальный размер файла обоев
    let backgroundImageSizeByte = 3145728;
    this.setState({ backgroundImageSizeByte });

    //Собираем начальное сообщение исходя из заданного размера файла
    let backgroundImageMessage =
      "Перетащите PNG или JPG файл или кликните для выбора. Максимальный размер файла — " +
      Math.floor((backgroundImageSizeByte / 1024 / 1024) * 100) / 100 +
      " МБ.";

    //Задаем начальное сообщение
    this.setState({ backgroundImageMessage });
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
        <form onClick={event => event.stopPropagation()}>
          <Lable>Обои</Lable>
          <Dropzone
            onDrop={acceptedFiles => this.onDrop(acceptedFiles)}
            accept="image/png, image/jpeg"
            minSize={0}
            maxSize={this.state.backgroundImageSizeByte}
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
          <Lable>Профиль</Lable>
          {INPUTS.map(inputs => (
            <div className="formInput">
              <Input
                placeholder={inputs.placeholder}
                label={inputs.label}
                name={inputs.name}
                type={inputs.type}
                value={this.state.user[inputs.name]}
                defaultValue={this.state.user[inputs.name]}
                onChange={event => this.onChange(event)}
                invalidMessage={
                  !!this.state.isTouched
                    ? this.state.validation[inputs.name]
                    : ""
                }
              />
            </div>
          ))}
          <ErrorMessage message={this.props.updateProfileError} />
          <div className="formButton">
            <Button
              isPrimary={true}
              value="Обновить профиль"
              onClick={event => this.updateUser(event)}
            />
            <Button
              value="Выйти из учетной записи"
              onClick={event => this.logoff(event)}
            />
          </div>
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
