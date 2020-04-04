import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем компоненты
import Page from "../../../Components/Page/Page";
import Users from "./Users";

class AdminPanelRouter extends React.Component {
  render() {
    //Соберем меню страницы
    let routerLinksArray = [{ to: "/admin", value: "Пользователями" }];

    return (
      <React.Fragment>
        <Page
          title="Управление:"
          routerLinksArray={routerLinksArray}
          isAdmin={true}
          isCustomContent={true}
        >
          <Switch>
            <Route exact to path="/admin" component={Users} />
          </Switch>
        </Page>
      </React.Fragment>
    );
  }
}

export default AdminPanelRouter;
