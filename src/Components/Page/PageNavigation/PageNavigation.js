import React from "react";
import PageNavigationLink from "./PageNavigationLink/PageNavigationLink";
import "./PageNavigation.css";

class PageNavigation extends React.Component {
  render() {
    //Из массива соберем нужный набор ссылок
    let links = this.props.linksArray.map((link, index) => {
      return <PageNavigationLink to={link.to} value={link.value} key={index} />;
    });
    //И уже этот набор отрисуем
    return <div className="pageNavigation container">{links}</div>;
  }
}

export default PageNavigation;
