import React from "react";
//Компоненты
import HeaderNavigationLink from "../HeaderNavigationLink/HeaderNavigationLink";
//CSS
import "./DesktopHeaderNavigation.css";

class DesktopHeaderNavigation extends React.PureComponent {
  getMenu() {
    return (
      <div className="desktopHeaderNavigation">
        <HeaderNavigationLink
          exact={true}
          to="/"
          value="Главная"
          isOnlyNotAuth={true}
        />
        <HeaderNavigationLink
          to="/tasks_manager"
          value="Задачи"
          isNeedAuth={true}
        />
        <HeaderNavigationLink
          to="/categories"
          value="Категории"
          isNeedAuth={true}
        />
        <HeaderNavigationLink
          to="/statistic"
          value="Статистика"
          isNeedAuth={true}
        />
        <HeaderNavigationLink to="/admin" value="Управление" onlyAdmin={true} />
        <HeaderNavigationLink to="/about" value="Справка" />
      </div>
    );
  }

  render() {
    return this.getMenu();
  }
}

export default DesktopHeaderNavigation;
