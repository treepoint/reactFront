import React from "react";
import HeaderAnchor from "../HeaderAnchor/HeaderAnchor";
import AnchorModalWindow from "../../../Components/AnchorModalWindow/AnchorModalWindow";
import UserIcon from "./UserIcon/UserIcon";
import { connect } from "react-redux";
import "./UserMenu.css";
import {
  registration,
  login,
  profile
} from "../../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";

class UserMenu extends React.PureComponent {
  render() {
    return (
      <div className="userMenu">
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
        <UserIcon />
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

export default connect(mapStateToProps)(UserMenu);
