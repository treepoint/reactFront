import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем компоненты
import Page from "../../Components/Page/Page";
import Categories from "./Categories";
import TaskStatuses from "./TaskStatuses";
import TasksManager from "./TasksManager/TasksManager";

class WorkingAreaRouter extends React.Component {
  constructor(props) {
    super(props);
    //Список пользователей
    this.state = { usersList: [] };
    //Список категорий
    this.state = { categoriesList: [] };
  }

  render() {
    //Соберем меню страницы
    let menuLinksArray = [
      { to: "/working", value: "Список" },
      { to: "/working/categories", value: "Категории" },
      { to: "/working/task_statuses", value: "Статусы" }
    ];

    return (
      <Page title="Задачи:" menuLinksArray={menuLinksArray} isPrivate={true}>
        <Switch>
          <Route exact to path="/working" component={TasksManager} />
          <Route path="/working/categories" component={Categories} />
          <Route path="/working/task_statuses" component={TaskStatuses} />
        </Switch>
      </Page>
    );
  }
}

export default WorkingAreaRouter;
