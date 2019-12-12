import React from "react";
import Navigation from "./Navigation/Navigation";
import Spacer from "../../Components/Spacer/Spacer";
import Logo from "./Logo/Logo";
import UserMenu from "./UserMenu/UserMenu";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Logo />
        <Navigation />
        <Spacer />
        <UserMenu />
      </div>
    );
  }
}

export default Header;
