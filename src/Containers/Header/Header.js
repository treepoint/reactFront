import React from "react";
//Компоненты
import Logo from "../../Components/Logo/Logo";
import HeaderNavigation from "../../Components/HeaderNavigation/HeaderNavigation";
import Spacer from "../../Components/Spacer/Spacer";
import LoginMenu from "../../Components/LoginMenu/LoginMenu";
import Action from "../../Components/Action/Action";
//Redux
import { connect } from "react-redux";
//Подключаем модалки
import {
  setModalWindowState,
  setModalWindowName
} from "../../Store/actions/globalModalWindow";
//Настройки
import { settings } from "../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
//Картинки
import iconSettings from "../../Images/icon_settings.png";
//CSS
import "./Header.css";

class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
        <HeaderNavigation />
        <Spacer />
        <LoginMenu />
        {!!this.props.userAuthState ? (
          <div className="iconSettingsContainer">
            <Action
              icon={iconSettings}
              hint="Настройки"
              onClick={() => this.props.setModalWindow(settings)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthState: state.userAuthState
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
