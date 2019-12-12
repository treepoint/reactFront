import React from "react";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
//CSS
import "./Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <div className="navigation">
        <NavLink
          className="navigation link"
          exact
          to="/"
          activeClassName="current"
        >
          Главная
        </NavLink>
        <NavLink
          className="navigation link"
          exact
          to="/categories"
          activeClassName="current"
        >
          Категории задач
        </NavLink>
        <NavLink
          className="navigation link"
          exact
          to="/about"
          activeClassName="current"
        >
          Справка
        </NavLink>
        <NavLink
          className="navigation link"
          exact
          to="/users"
          activeClassName="current"
        >
          Пользователи
        </NavLink>
      </div>
    );
  }
}

export default Navigation;
