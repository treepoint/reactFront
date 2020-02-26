import React from "react";
import Action from "../../Action/Action";
import "./PageActions.css";

class PageActions extends React.PureComponent {
  render() {
    //Если экшены
    let actionsLinks = [];

    if (typeof this.props.actionsArray !== "undefined") {
      actionsLinks = this.props.actionsArray.map((action, index) => {
        return (
          <Action
            icon={action.icon}
            onClick={action.onClick}
            isTransparent
            key={index}
            style={action.style}
          />
        );
      });
    }

    return (
      !!actionsLinks.length ?
        <div className="pageActions">{actionsLinks}</div> : null
    );
  }
}

export default PageActions;
