import React from "react";
import PageNavigationLink from "./PageNavigationLink/PageNavigationLink";
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

    return (
      <div className="pageNavigation container">
        {routerLinks}
        {achrorLinks}
      </div>
    );
  }
}

export default PageNavigation;
