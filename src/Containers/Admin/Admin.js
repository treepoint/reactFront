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
        className="pageMenu"
        exact
        to="/admin/users"
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
            <Route path="/admin/users" component={Users} />
          </Switch>
        </Page>
      </div>
    );
  }
}

export default Admin;
