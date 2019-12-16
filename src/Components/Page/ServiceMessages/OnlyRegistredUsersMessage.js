import React from "react";
//Подключаем модалки
import { login, registration } from "../../ModalWindow/MODAL_WINDOWS";
import AnchorModalWindow from "../../../Containers/AnchorModalWindow/AnchorModalWindow";
//Импортируем компоненты
import Anchor from "../../Anchor/Anchor";

class OnlyRegistredUsersMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Страница доступна только зарегистрированным пользователям.</p>
        <p>
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
        </p>
      </div>
    );
  }
}

export default OnlyRegistredUsersMessage;
