import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
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
    //Соберем меню страницы
    let menuLinksArray = [
      { to: "/working", value: "Список" },
      { to: "/working/categories", value: "Категории" }
    ];

    return (
      <div>
        <Page title="Задачи:" menuLinksArray={menuLinksArray} isPrivate={true}>
          <Switch>
            <Route exact to path="/working" component={Tasks} />
            <Route path="/working/categories" component={Categories} />
          </Switch>
        </Page>
      </div>
    );
  }
}

export default WorkingArea;
