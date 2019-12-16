import React from "react";
//Подключаем роутинг
import { Switch, Route, NavLink } from "react-router-dom";
//Подключаем компоненты
import Page from "../../Components/Page/Page";
import Users from "./Users";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [] };
  }

  render() {
    let pageMenu = (
      <NavLink
        className="pageMenu link"
        exact
        to="/admin"
        activeClassName="current"
      >
        Пользователи
      </NavLink>
    );

    return (
      <div>
        <Page
          title="Административная панель:"
          pageMenu={pageMenu}
          isPrivate={true}
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
