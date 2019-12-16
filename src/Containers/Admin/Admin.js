import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем компоненты
import Page from "../../Components/Page/Page";
import Users from "./Users";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [] };
  }

  render() {
    //Соберем меню страницы
    let menuLinksArray = [{ to: "/admin", value: "Пользователи" }];

    return (
      <div>
        <Page
          title="Административная панель:"
          menuLinksArray={menuLinksArray}
          isAdmin={true}
        >
          <Switch>
            <Route exact to path="/admin" component={Users} />
          </Switch>
        </Page>
      </div>
    );
  }
}

export default Admin;
