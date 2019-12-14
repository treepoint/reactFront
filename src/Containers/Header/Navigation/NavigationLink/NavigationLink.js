import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import "./NavigationLink.css";

class NavigationLink extends React.Component {
  checkPrivileges() {
    if (this.props.onlyAdmin) {
      if (!!this.props.token && this.props.user.role === "admin") {
        return true;
      }
      return false;
    }
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
    token: state.token,
    user: state.user
  };
};

export default connect(mapStateToProps)(NavigationLink);
