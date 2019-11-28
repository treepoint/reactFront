import React from "react";
import "./MainMenu.css";

class MainMenu extends React.Component {
  render() {
    return (
      <div className="menu">
        <a className="link" href="/">
          Главная
        </a>
        <a className="link" href="/about">
          Справка
        </a>
        <a className="link" href="/users">
          Пользователи
        </a>
      </div>
    );
  }
}

export default MainMenu;
