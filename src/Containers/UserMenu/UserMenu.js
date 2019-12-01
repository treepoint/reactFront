import React from "react";
import HeaderAnchor from "../../Components/HeaderAnchor/HeaderAnchor";
import AnchorModalWindow from "../AnchorModalWindow/AnchorModalWindow";
import UserIcon from "../../Components/UserIcon/UserIcon";
import { connect } from "react-redux";
import "./UserMenu.css";
import {
  registration,
  login,
  profile
} from "../../Components/ModalWindow/MODAL_WINDOWS";

class UserMenu extends React.Component {
  render() {
    return (
      <div className="userMenu">
        {!!this.props.token && !!this.props.user.email ? (
          <HeaderAnchor>
            <AnchorModalWindow
              value={this.props.user.email}
              modalWindowName={profile}
            />
          </HeaderAnchor>
        ) : (
          <div>
            <HeaderAnchor>
              <AnchorModalWindow
                value="Регистрация"
                modalWindowName={registration}
              />
            </HeaderAnchor>
            /
            <HeaderAnchor>
              <AnchorModalWindow value="Войти" modalWindowName={login} />
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
    token: state.token,
    user: state.user
  };
};

export default connect(mapStateToProps)(UserMenu);
