import React from "react";
//Подключаем роутинг
import { NavLink } from "react-router-dom";
import "./PageNavigationLink.css";

class PageNavigationLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        {!!this.props.isAnchor ? (
          !!this.props.isCurrent ? (
            <div
              className="pageNavigationLink current"
              onClick={this.props.callback}
            >
              {this.props.value}
            </div>
          ) : (
            <div className="pageNavigationLink" onClick={this.props.callback}>
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
