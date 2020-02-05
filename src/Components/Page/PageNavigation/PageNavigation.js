import React from "react";
import PageNavigationLink from "./PageNavigationLink/PageNavigationLink";
import Action from "../../Action/Action";
import Spacer from "../../Spacer/Spacer";
import "./PageNavigation.css";

class PageNavigation extends React.PureComponent {
  render() {
    //Здесь у нас два варианта, либо работаем через роутер, либо через якори.
    //Если роутер
    let routerLinks = [];
    if (typeof this.props.routerLinksArray !== "undefined") {
      routerLinks = this.props.routerLinksArray.map((link, index) => {
        return (
          <PageNavigationLink to={link.to} value={link.value} key={index} />
        );
      });
    }
    //Если якори
    let achrorLinks = [];
    if (typeof this.props.anchorLinksArray !== "undefined") {
      achrorLinks = this.props.anchorLinksArray.map((link, index) => {
        return (
          <PageNavigationLink
            isAnchor={true}
            isCurrent={link.isCurrent}
            callback={link.callback}
            value={link.value}
            key={index}
          />
        );
      });
    }

    //Если экшены
    let actionsLinks = [];
    if (typeof this.props.actionsArray !== "undefined") {
      actionsLinks = this.props.actionsArray.map((link, index) => {
        return (
          <Action
            icon={link.icon}
            onClick={link.onClick}
            isTransparent
            key={index}
            style={link.style}
          />
        );
      });
    }

    return (
      <div className="pageNavigation">
        {routerLinks}
        {achrorLinks}
        <Spacer />
        <div className="pageNavigationActions">{actionsLinks}</div>
      </div>
    );
  }
}

export default PageNavigation;
