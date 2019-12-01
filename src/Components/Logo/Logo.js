import React from "react";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import logo from "../../Images/logo.png";

class Logo extends React.Component {
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
            backgroundSize: "101px 17px"
          }}
        />
      </NavLink>
    );
  }
}

export default Logo;
