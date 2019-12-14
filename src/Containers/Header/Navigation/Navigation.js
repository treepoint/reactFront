import React from "react";
//Подключаем redux
import { connect } from "react-redux";
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
        {!!this.props.token && this.props.user.role === "admin" ? (
          <NavLink
            className="navigation link"
            exact
            to="/admin"
            activeClassName="current"
          >
            Админ.панель
          </NavLink>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    user: state.user
  };
};

export default connect(mapStateToProps)(Navigation);
