import React from "react";
//Компоненты
import Logo from "../../Components/Logo/Logo";
import HeaderNavigation from "../../Components/HeaderNavigation/HeaderNavigation";
import Spacer from "../../Components/Spacer/Spacer";
import LoginMenu from "../../Components/LoginMenu/LoginMenu";

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
      </div>
    );
  }
}

export default Header;
