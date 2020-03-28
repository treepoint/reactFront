import React from "react";
//Redux
import { connect } from "react-redux";
//Компоненты
import HeaderAnchor from "../HeaderAnchor/HeaderAnchor";
import AnchorModalWindow from "../AnchorModalWindow/AnchorModalWindow";
import Action from "../../Components/Action/Action";
//Модалки
import {
  setModalWindowState,
  setModalWindowName
} from "../../Store/actions/globalModalWindow";
//Настройки
import {
  registration,
  login,
  settings
} from "../GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
//Картинки
import iconSettings from "../../Images/icon_settings.png";
//CSS
import "./LoginMenu.css";

class LoginMenu extends React.PureComponent {
  render() {
    return (
      <div className="loginMenu">
        {!!this.props.userAuthState ? (
          <div
            className="userMenuAnchor"
            onClick={() => this.props.setModalWindow(settings)}
          >
            <div className="currentUserLable">
              {this.props.currentUser.email}
            </div>
            {!!this.props.userAuthState ? (
              <div className="iconSettingsContainer">
                <Action icon={iconSettings} hint="Настройки" />
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <HeaderAnchor>
              <AnchorModalWindow value="Войти" modalWindowName={login} />
            </HeaderAnchor>
            /
            <HeaderAnchor>
              <AnchorModalWindow
                value="Регистрация"
                modalWindowName={registration}
              />
            </HeaderAnchor>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthState: state.userAuthState,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setModalWindow: modalWindowName => {
      dispatch(setModalWindowState(true));
      dispatch(setModalWindowName(modalWindowName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginMenu);
