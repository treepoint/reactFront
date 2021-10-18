import React from "react";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import "./PageNavigationLink.css";

class PageNavigationLink extends React.Component {

  getSecondary() {
    if (this.props.isSecondaryOption === true) {
      return " secondary";
    } else return "";
  }

  render() {
    return (
      <React.Fragment>
        {!!this.props.isAnchor ? (
          !!this.props.isCurrent ? (
            <div
              className={"pageNavigationLink current" + this.getSecondary()}
              onClick={this.props.callback}
            >
              {this.props.value}
            </div>
          ) : (
            <div className={"pageNavigationLink" + this.getSecondary()} onClick={this.props.callback}>
              {this.props.value}
            </div>
          )
        ) : (
          <NavLink
            className="pageNavigationLink"
            exact
            to={this.props.to}
            activeClassName="current"
          >
            {this.props.value}
          </NavLink>
        )}
      </React.Fragment>
    );
  }
}

export default PageNavigationLink;
