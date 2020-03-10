import React from "react";
//Компоненты
import Logo from "../../Components/Logo/Logo";
import HeaderNavigation from "../../Components/HeaderNavigation/HeaderNavigation";
import Spacer from "../../Components/Spacer/Spacer";
import HeaderWarning from "../../Components/HeaderWarning/HeaderWarning";
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
        <HeaderWarning
          message={
            <React.Fragment>
              <p>
                Веб-приложение находится в разработке. Рекомендуемый браузер —
                Firefox.
              </p>
              <p>Номер сборки: 0.8.0</p>
            </React.Fragment>
          }
        />
        <LoginMenu />
        {!!this.props.userAuthState ? (
          <Action
            icon={iconSettings}
            isTransparent={true}
            onClick={() => this.props.setModalWindow(settings)}
            style={{ marginRight: "6px", marginTop: "7px" }}
          />
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
