import React from "react";
import HeaderAnchor from "../../Components/HeaderAnchor/HeaderAnchor";
import RegistrationAnchor from "../RegistrationAnchor/RegistrationAnchor";
import LoginAnchor from "../LoginAnchor/LoginAnchor";
import UserIcon from "../../Components/UserIcon/UserIcon";
import { connect } from "react-redux";
import "./userMenu.css";

class UserMenu extends React.Component {
  render() {
    return (
      <div className="userMenu">
        {!!this.props.isUserLogin ? (
          this.props.userEmail
        ) : (
          <div>
            <HeaderAnchor>
              <RegistrationAnchor />
            </HeaderAnchor>
            /
            <HeaderAnchor>
              <LoginAnchor />
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
    userEmail: state.userEmail
  };
};

export default connect(mapStateToProps)(UserMenu);
