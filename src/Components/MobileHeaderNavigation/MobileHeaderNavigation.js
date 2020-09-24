import React from "react";
//Компоненты
import HeaderNavigationLink from "../HeaderNavigationLink/HeaderNavigationLink";
import Action from "../Action/Action";
//Картинки
import wideMenuIcon from "../../Images/icon_wide_menu.png";
//CSS
import "./MobileHeaderNavigation.css";

class MobileHeaderNavigation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isMobileMenuHidden: true
    };
  }

  getMenu() {
    let menuAction = (
      <div className="mobileMenuAction">
        <Action
          icon={wideMenuIcon}
          isPressed={!this.state.isMobileMenuHidden}
          height={30}
          width={30}
          onClick={event =>
            this.setState({
              isMobileMenuHidden: !this.state.isMobileMenuHidden
            })
          }
        />
      </div>
    );

    if (this.state.isMobileMenuHidden) {
      return menuAction;
    }

    return (
      <React.Fragment>
        {menuAction}
        <div className="mobileHeaderNavigation">
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
            onClick={event =>
              this.setState({
                isMobileMenuHidden: !this.state.isMobileMenuHidden
              })
            }
          />
          <div className="menuDivider" />
          <HeaderNavigationLink
            to="/categories"
            value="Категории"
            isNeedAuth={true}
            onClick={event =>
              this.setState({
                isMobileMenuHidden: !this.state.isMobileMenuHidden
              })
            }
          />
          <div className="menuDivider" />
          <HeaderNavigationLink
            to="/projects"
            value="Проекты"
            isNeedAuth={true}
            onClick={event =>
              this.setState({
                isMobileMenuHidden: !this.state.isMobileMenuHidden
              })
            }
          />
          <div className="menuDivider" />
          <HeaderNavigationLink
            to="/statistic"
            value="Статистика"
            isNeedAuth={true}
            onClick={event =>
              this.setState({
                isMobileMenuHidden: !this.state.isMobileMenuHidden
              })
            }
          />
          <div className="menuDivider" />
          <HeaderNavigationLink
            to="/admin"
            value="Управление"
            onlyAdmin={true}
            onClick={event =>
              this.setState({
                isMobileMenuHidden: !this.state.isMobileMenuHidden
              })
            }
          />
          <div className="menuDivider" />
          <HeaderNavigationLink
            to="/about"
            value="Справка"
            onClick={event =>
              this.setState({
                isMobileMenuHidden: !this.state.isMobileMenuHidden
              })
            }
          />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return this.getMenu();
  }
}

export default MobileHeaderNavigation;
