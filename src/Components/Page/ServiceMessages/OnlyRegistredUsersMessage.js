import React from "react";
//Подключаем модалки
import { login, registration } from "../../ModalWindow/MODAL_WINDOWS";
import AnchorModalWindow from "../../../Containers/AnchorModalWindow/AnchorModalWindow";
//Импортируем компоненты
import Anchor from "../../Anchor/Anchor";

class OnlyRegistredUsersMessage extends React.Component {
  render() {
    return (
      <article>
        <div className="p">
          Страница доступна только зарегистрированным пользователям.
        </div>
        <div className="p">
          Пожалуйста,{" "}
          <Anchor>
            <AnchorModalWindow value="войдите" modalWindowName={login} />
          </Anchor>{" "}
          или{" "}
          <Anchor>
            <AnchorModalWindow
              value="зарегистрируйтесь"
              modalWindowName={registration}
            />
          </Anchor>
          .
        </div>
      </article>
    );
  }
}

export default OnlyRegistredUsersMessage;
