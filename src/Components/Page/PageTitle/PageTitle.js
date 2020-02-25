import React from "react";
import PageNavigation from "../PageNavigation/PageNavigation";
import PageActions from "../PageActions/PageActions";
import AdditionalTitleBlock from "../AdditionalTitleBlock/AdditionalTitleBlock";
import Spacer from "../../Spacer/Spacer";
import "./PageTitle.css";

class PageTitle extends React.PureComponent {
  render() {
    return (
      <div className="pageTitle">
        {/*Добавляем меню, если есть*/}
        <PageNavigation
          title={this.props.title}
          routerLinksArray={
            !!this.props.routerLinksArray ? this.props.routerLinksArray : []
          }
          anchorLinksArray={
            !!this.props.anchorLinksArray ? this.props.anchorLinksArray : []
          }
        />
        <Spacer />
        <AdditionalTitleBlock>{this.props.additionalTitleBlock}</AdditionalTitleBlock>
        <PageActions
          actionsArray={
            !!this.props.actionsArray ? this.props.actionsArray : []
          }
        />
      </div>
    );
  }
}

export default PageTitle;
