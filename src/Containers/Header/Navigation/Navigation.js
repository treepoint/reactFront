import React from "react";
import NavigationLink from "./NavigationLink/NavigationLink";
//CSS
import "./Navigation.css";

class Navigation extends React.PureComponent {
  render() {
    return (
      <div className="navigation">
        <NavigationLink exact={true} to="/" value="Главная" />
        <NavigationLink to="/tasks_manager" value="Задачи" isNeedAuth={true} />
        <NavigationLink to="/task_statuses" value="Статусы" isNeedAuth={true} />
        <NavigationLink to="/categories" value="Категории" isNeedAuth={true} />
        <NavigationLink to="/statistic" value="Статистика" isNeedAuth={true} />
        <NavigationLink to="/admin" value="Админ.панель" onlyAdmin={true} />
        <NavigationLink to="/about" value="Справка" />
      </div>
    );
  }
}

export default Navigation;
