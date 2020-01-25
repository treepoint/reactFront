import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import "./NavigationLink.css";

class NavigationLink extends React.Component {
  checkPrivileges() {
    //Если нужны админские права, а их нет
    if (this.props.onlyAdmin && !this.props.isAdmin) {
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
            ? "navigation link"
            : "navigation link hidden"
        }
        activeClassName="current"
        to={this.props.to}
      >
        {this.props.value}
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.currentUserIsAdmin
  };
};

export default connect(mapStateToProps)(NavigationLink);
