import React from "react";
import LoginButton from "../../Components/LoginButton/LoginButton";
import logo from "../../Images/logo.png";
import "./header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div
          className="logo"
          style={{
            background: "url(" + logo + ") no-repeat scroll 100% 0 transparent",
            backgroundSize: "32px 32px"
          }}
        />
        <LoginButton />
      </div>
    );
  }
}

export default Header;
