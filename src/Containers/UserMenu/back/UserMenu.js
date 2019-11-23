import React from "react";
import HeaderAnchor from "../../../Components/HeaderAnchor/back/HeaderAnchor";
import AnchorModalWindow from "../../AnchorModalWindow/AnchorModalWindow";
import UserIcon from "../../../Components/UserIcon/back/UserIcon";
import { connect } from "react-redux";
import "./UserMenu.css";
import { registration, login, profile } from "../../App/MODAL_WINDOWS";

class UserMenu extends React.Component {
  render() {
    return (
      <div className="userMenu">
        {!!this.props.isUserLogin ? (
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
    isUserLogin: state.isUserLogin,
    user: state.user
  };
};

export default connect(mapStateToProps)(UserMenu);
