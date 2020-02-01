import React from "react";
import Dropzone from "react-dropzone";
//Подключаем redux
import { connect } from "react-redux";
import { setModalWindowState } from "../../Store/actions/globalModalWindow";
import { updateTasksWallpapers } from "../../Store/actions/userSettings";
import { setCurrentUser } from "../../Store/actions/currentUser";
import { login } from "../../Store/actions/app";
//Импортируем компоненты
import Button from "../../Components/Button/Button";
import Lable from "../../Components/Lable/Lable";
//CSS
import "./TaskSettings.css";

class TaskSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: [],
      backgroundImageMessage:
        "Перетащите png или jpg файл или кликните для выбора"
    };
  }

  onDrop(acceptedFiles) {
    if (typeof acceptedFiles[0] === "undefined") {
      this.setState({
        backgroundImageMessage:
          "Файл не поддерживается. Попробуйте другой файл."
      });
    } else {
      this.props.updateTasksWallpapers(acceptedFiles[0]);
      this.setState({ backgroundImageMessage: "Файл успешно загружен!" });
    }
  }

  render() {
    return (
      <form onClick={event => event.stopPropagation()}>
        <h1 className="h1">Настройки задач</h1>
        <Lable>Изменение обоев</Lable>
        <Dropzone
          onDrop={acceptedFiles => this.onDrop(acceptedFiles)}
          accept="image/png, image/jpeg"
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="loadBackgroundArea">
                  {this.state.backgroundImageMessage}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <Button
          isPrimary
          value="Закрыть"
          onClick={() => this.props.setModalWindowState(false)}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    token: state.token,
    authError: state.authError,
    userSettings: state.userSettings
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
    updateTasksWallpapers: file => {
      dispatch(updateTasksWallpapers(file));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSettings);
