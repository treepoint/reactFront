import React from "react";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import "./PageNavigationLink.css";

class PageNavigationLink extends React.Component {
  render() {
    return (
      <div className="pageNavigation link">
        <NavLink
          className="pageNavigation link"
          exact
          to={this.props.to}
          activeClassName="current"
        >
          {this.props.value}
        </NavLink>
      </div>
    );
  }
}

export default PageNavigationLink;
