import React from "react";
//Redux
import { connect } from "react-redux";
//Компоненты
import HeaderAnchor from "../HeaderAnchor/HeaderAnchor";
import AnchorModalWindow from "../AnchorModalWindow/AnchorModalWindow";
//Модалки
import {
  registration,
  login,
  profile
} from "../GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
//CSS
import "./LoginMenu.css";

class LoginMenu extends React.PureComponent {
  render() {
    return (
      <div className="loginMenu">
        {!!this.props.userAuthState ? (
          <HeaderAnchor>
            <AnchorModalWindow
              value={this.props.currentUser.email}
              modalWindowName={profile}
            />
          </HeaderAnchor>
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
    currentUser: state.currentUser,
    userAuthState: state.userAuthState
  };
};

export default connect(mapStateToProps)(LoginMenu);
