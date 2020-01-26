import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем компоненты
import Page from "../../../Components/Page/Page";
import Users from "./Users";

class AdminPanelRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [] };
  }

  render() {
    //Соберем меню страницы
    let routerLinksArray = [{ to: "/admin", value: "Пользователи" }];

    return (
      <React.Fragment>
        <Page
          title="Административная панель:"
          routerLinksArray={routerLinksArray}
          isAdmin={true}
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
