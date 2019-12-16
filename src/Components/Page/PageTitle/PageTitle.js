import React from "react";
import PageNavigation from "../PageNavigation/PageNavigation";
import "./PageTitle.css";

class PageTitle extends React.Component {
  render() {
    return (
      <div className="pageTitle">
        {/*Рисуем основной заголовок*/}
        {this.props.title}
        {/*Добавляем меню, если есть*/}
        <PageNavigation
          linksArray={
            !!this.props.menuLinksArray ? this.props.menuLinksArray : []
          }
        />
      </div>
    );
  }
}

export default PageTitle;
