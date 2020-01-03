import React from "react";
//Подключаем модалки
import { login } from "../../ModalWindow/MODAL_WINDOWS";
import AnchorModalWindow from "../../AnchorModalWindow/AnchorModalWindow";
//Импортируем компоненты
import Anchor from "../../Anchor/Anchor";

class OnlyAdminMessage extends React.Component {
  render() {
    return (
      <div>
        <div className="p">Страница доступна только администраторам.</div>
        <div className="p">
          Пожалуйста,{" "}
          <Anchor>
            <AnchorModalWindow value="войдите" modalWindowName={login} />
          </Anchor>{" "}
          под учетной записью администратора.
        </div>
      </div>
    );
  }
}

export default OnlyAdminMessage;
