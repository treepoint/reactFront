import React from "react";
import RegistrationButton from "../RegistrationButton/RegistrationButton";
import LoginButton from "../LoginButton/LoginButton";
import UserIcon from "../../Components/UserIcon/UserIcon";
import "./userMenu.css";

class UserMenu extends React.Component {
  render() {
    return (
      <div className="userMenu">
        <RegistrationButton />
        /
        <LoginButton />
        <UserIcon />
      </div>
    );
  }
}

export default UserMenu;
