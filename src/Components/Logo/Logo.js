import React from "react";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import logo from "../../Images/logo.png";
import "./Logo.css";

class Logo extends React.PureComponent {
  render() {
    return (
      <NavLink
        style={{ display: "contents" }}
        exact
        to="/"
        activeClassName="current"
      >
        <div
          className="logo"
          style={{
            background: "url(" + logo + ") no-repeat scroll 100% 0 transparent",
            backgroundSize: "44px 44px"
          }}
        />
      </NavLink>
    );
  }
}

export default Logo;
