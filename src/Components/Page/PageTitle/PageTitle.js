import React from "react";
import PageNavigation from "../PageNavigation/PageNavigation";
import "./PageTitle.css";

class PageTitle extends React.PureComponent {
  render() {
    return (
      <div className="pageTitle">
        {/*Рисуем основной заголовок*/}
        <div className="pageName">{this.props.title}</div>
        {/*Добавляем меню, если есть*/}
        <PageNavigation
          routerLinksArray={
            !!this.props.routerLinksArray ? this.props.routerLinksArray : []
          }
          anchorLinksArray={
            !!this.props.anchorLinksArray ? this.props.anchorLinksArray : []
          }
          actionsArray={
            !!this.props.actionsArray ? this.props.actionsArray : []
          }
        />
      </div>
    );
  }
}

export default PageTitle;
