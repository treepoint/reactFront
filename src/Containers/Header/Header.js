import React from "react";
import UserMenu from "../UserMenu/UserMenu";
import Spacer from "../../Components/Spacer/Spacer";
import MainMenu from "../../Components/MainMenu/MainMenu";
import logo from "../../Images/logo.png";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <a href="/" style={{ display: "contents" }}>
          <div
            className="logo"
            style={{
              background:
                "url(" + logo + ") no-repeat scroll 100% 0 transparent",
              backgroundSize: "101px 17px"
            }}
          />
        </a>
        <MainMenu />
        <Spacer />
        <UserMenu />
      </div>
    );
  }
}

export default Header;
