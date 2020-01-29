import React from "react";
import Dropzone from "react-dropzone";
//Подключаем redux
import { connect } from "react-redux";
import { setModalWindowState } from "../../Store/actions/globalModalWindow";
import { setTasksBackgroundImage } from "../../Store/actions/settings";
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
      backgroundImageMessage: "Перетащите изображение или кликните для выбора"
    };
  }

  onDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onload = event => {
        this.setState({
          backgroundImageMessage: "Изображение успешно загружено!"
        });

        this.props.setTasksBackgroundImage(reader.result);
      };

      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <form onClick={event => event.stopPropagation()}>
        <h1 className="h1">Настройки задач</h1>
        <Lable>Изображение обоев</Lable>
        <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)}>
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

        <Button isPrimary={true} value="Сохранить" />
        <Button
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
    },
    setModalWindowState: boolean => {
      dispatch(setModalWindowState(boolean));
    },
    setTasksBackgroundImage: string => {
      dispatch(setTasksBackgroundImage(string));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskSettings);
