import React from "react";
//Подключаем роутинг
import { Switch, Route, NavLink } from "react-router-dom";
//Подключаем компоненты
import Page from "../../Components/Page/Page";
import Categories from "./Categories";

class WorkingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersList: [] };
  }

  render() {
    let pageMenu = (
      <NavLink
        className="pageMenu"
        exact
        to="/working/categories"
        activeClassName="current"
      >
        Категории
      </NavLink>
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
          </Switch>
        </Page>
      </div>
    );
  }
}

export default WorkingArea;
