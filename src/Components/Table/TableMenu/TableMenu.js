import React from "react";
import Action from "../../Action/Action";
//Подключаем изображения иконок и CSS
import iconUpdate from "../../../Images/icon_update.png";
import "./TableMenu.css";

class TableMenu extends React.Component {
  render() {
    let actions = [];

    if (typeof this.props.updateTableContent === "function") {
      actions.push(
        <Action
          icon={iconUpdate}
          onClick={() => this.props.updateTableContent()}
        />
      );
    }

    let tableMenu;

    if (actions.length !== 0) {
      tableMenu = <div className="tableMenu">{actions}</div>;
    }

    return <div>{tableMenu}</div>;
  }
}

export default TableMenu;
