import React from "react";
//Подключаем роутинг
import { Switch, Route } from "react-router-dom";
//Подключаем компоненты
import Page from "../../../Components/Page/Page";
import TasksStatistic from "./TasksStatistic/TasksStatistic";
import CategoriesStatistic from "./CategoriesStatistic/CategoriesStatistic";

class StatisticRouter extends React.Component {
  render() {
    //Соберем меню страницы
    let routerLinksArray = [
      { to: "/statistic", value: "По задачам" },
      { to: "/statistic/categories", value: "По категориям" }
    ];

    return (
      <Page
        title="Статистика:"
        routerLinksArray={routerLinksArray}
        isCustomContent={true}
        isPrivate={true}
      >
        <Switch>
          <Route exact to path="/statistic" component={TasksStatistic} />
          <Route path="/statistic/categories" component={CategoriesStatistic} />
        </Switch>
      </Page>
    );
  }
}

export default StatisticRouter;
