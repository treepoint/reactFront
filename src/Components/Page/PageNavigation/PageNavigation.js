import React from "react";
import PageNavigationLink from "./PageNavigationLink/PageNavigationLink";
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
    let achrorLinksMain = [];
    let achrorLinksSecondary = [];

    if (typeof this.props.anchorLinksArray !== "undefined") {
      achrorLinksMain = this.props.anchorLinksArray.map((link, index) => {
        if (!link.isSecondaryOption) {
          return (
            <PageNavigationLink
              isAnchor={true}
              isCurrent={link.isCurrent}
              callback={link.callback}
              value={link.value}
              isSecondaryOption={link.isSecondaryOption}
              key={index}
            />
          );
        } else return (null);
      });

      achrorLinksSecondary = this.props.anchorLinksArray.map((link, index) => {
        if (link.isSecondaryOption) {
          return (
            <PageNavigationLink
              isAnchor={true}
              isCurrent={link.isCurrent}
              callback={link.callback}
              value={link.value}
              isSecondaryOption={link.isSecondaryOption}
              key={index}
            />
          );
        } else return (null);
      });
    }

    return (
      <div className="pageNavigation">
        {/*Рисуем основной заголовок*/}
        <div className="pageName">{this.props.title}</div>
        {routerLinks}
        {achrorLinksMain}
        <Spacer />
        {achrorLinksSecondary}
      </div>
    );
  }
}

export default PageNavigation;
