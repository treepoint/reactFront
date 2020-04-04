import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import "./HeaderNavigationLink.css";

class HeaderNavigationLink extends React.PureComponent {
  checkPrivileges() {
    //Если нужны админские права, а их нет
    if (this.props.onlyAdmin && !this.props.isAdmin) {
      return false;
    }

    //Если нужна авторизация, а её нет
    if (this.props.isNeedAuth && !this.props.userAuthState) {
      return false;
    }

    //Если авторизация не нужна, а она есть
    if (this.props.isOnlyNotAuth && this.props.userAuthState) {
      return false;
    }

    //В противном случае все хорошо
    return true;
  }

  render() {
    return (
      <NavLink
        className={
          !!this.checkPrivileges()
            ? "headerNavigation link"
            : "headerNavigation link hidden"
        }
        activeClassName="current"
        exact={this.props.exact}
        to={this.props.to}
        onClick={
          !!this.props.onClick ? event => this.props.onClick(event) : null
        }
      >
        {this.props.value}
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.currentUserIsAdmin,
    userAuthState: state.userAuthState
  };
};

export default connect(mapStateToProps)(HeaderNavigationLink);
