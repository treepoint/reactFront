import React from "react";
import Navigation from "../../Components/HeaderNavigation/Navigation";
import Spacer from "../../Components/Spacer/Spacer";
import Logo from "../../Components/Logo/Logo";
import LoginMenu from "../../Components/LoginMenu/LoginMenu";
import "./Header.css";

class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <Logo />
        <Navigation />
        <Spacer />
        <LoginMenu />
      </div>
    );
  }
}

export default Header;
