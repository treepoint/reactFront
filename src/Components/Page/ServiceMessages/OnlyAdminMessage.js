import React from "react";
//Подключаем модалки
import { login } from "../../ModalWindow/MODAL_WINDOWS";
import AnchorModalWindow from "../../../Containers/AnchorModalWindow/AnchorModalWindow";
//Импортируем компоненты
import Anchor from "../../Anchor/Anchor";

class OnlyAdminMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Страница доступна только администраторам.</p>
        <p>
          Пожалуйста,{" "}
          <Anchor>
            <AnchorModalWindow value="войдите" modalWindowName={login} />
          </Anchor>{" "}
          под учетной записью администратора.
        </p>
      </div>
    );
  }
}

export default OnlyAdminMessage;
