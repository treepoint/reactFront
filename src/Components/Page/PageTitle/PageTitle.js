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
          routerLinksArray={
            !!this.props.routerLinksArray ? this.props.routerLinksArray : []
          }
          anchorLinksArray={
            !!this.props.anchorLinksArray ? this.props.anchorLinksArray : []
          }
        />
      </div>
    );
  }
}

export default PageTitle;
