import React from "react";
import PageNavigationLink from "./PageNavigationLink/PageNavigationLink";
import "./PageNavigation.css";

class PageNavigation extends React.Component {
  render() {
    //Из массива соберем нужный набор ссылок
    let links = this.props.linksArray.map(link => {
      return <PageNavigationLink to={link.to} value={link.value} />;
    });
    //И уже этот набор отрисуем
    return <div className="pageNavigation container">{links}</div>;
  }
}

export default PageNavigation;
