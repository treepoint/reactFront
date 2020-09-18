import React from "react";
//Подключаем модалки
import {
  login,
  registration
} from "../../../Components/GlobalModalWindow/GLOBAL_MODAL_WINDOWS";
import AnchorModalWindow from "../../../Components/AnchorModalWindow/AnchorModalWindow";
//Импортируем компоненты
import Anchor from "../../../Components/Anchor/Anchor";
import Page from "../../../Components/Page/Page";

class Page404 extends React.PureComponent {
  render() {
    return (
      <Page title="Ничего не найдено или страница требует авторизации">
        <p>
          Возможно вы попытались зайти на страницу, недоступную для
          неавторизованного пользователя или данной страницы не существует.
          <p>
            Пожалуйста,
            <Anchor>
              <AnchorModalWindow value="войдите" modalWindowName={login} />
            </Anchor>
            или
            <Anchor>
              <AnchorModalWindow
                value="зарегистрируйтесь."
                modalWindowName={registration}
              />
            </Anchor>
          </p>
        </p>
      </Page>
    );
  }
}

export default Page404;
