import React from "react";
import Page from "../../../Components/Page/Page";

class About extends React.PureComponent {
  render() {
    return (
      <Page title="Справка">
        <p>
          Этот проект написан на React, NodeJS и использует MySQL как базу
          данных. Все есть на Github:
          <ul>
            <li>
              Фронт —{" "}
              <a href="https://github.com/treepoint/todayTasksFront">
              https://github.com/treepoint/todayTasksFront
              </a>
            </li>
            <li>
              API —{" "}
              <a href="https://github.com/treepoint/todayTasksAPI">
              https://github.com/treepoint/todayTasksAPI
              </a>
            </li>
            <li>
              Скрипты MySQL —{" "}
              <a href="https://github.com/treepoint/todayTasksDB">
              https://github.com/treepoint/todayTasksDB
              </a>
            </li>
          </ul>
        </p>
        <p>
          После каждого коммита происходит сборка через jenkins. Последняя
          собранная версия автоматически размещается здесь →{" "}
          <a href="https://todaytasks.ru"> https://todaytasks.ru</a>
        </p>
        <p>Спасибо за интерес!</p>
      </Page>
    );
  }
}

export default About;
