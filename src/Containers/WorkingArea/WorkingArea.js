import React from "react";
//Подключаем роутинг
import { Switch, Route, NavLink } from "react-router-dom";
//Подключаем компоненты
import Page from "../../Components/Page/Page";
import Categories from "./Categories";
import Tasks from "./Tasks";

class WorkingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [] };
  }

  render() {
    let pageMenu = (
      <div>
        <NavLink
          className="pageMenu"
          exact
          to="/working/tasks"
          activeClassName="current"
        >
          Список
        </NavLink>
        <NavLink
          className="pageMenu"
          exact
          to="/working/categories"
          activeClassName="current"
        >
          Категории
        </NavLink>
      </div>
    );

    return (
      <div>
        <Page
          title="Задачи:"
          pageMenu={pageMenu}
          isPrivate={true}
          isAdmin={true}
        >
          <Switch>
            <Route path="/working/categories" component={Categories} />
            <Route path="/working/tasks" component={Tasks} />
          </Switch>
        </Page>
      </div>
    );
  }
}

export default WorkingArea;
