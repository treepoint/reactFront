import React from "react";
import Page from "../../../Components/Page/Page";

class About extends React.Component {
  render() {
    return (
      <Page title="Справка">
        <p>
          Этот проект написан на React, NodeJS и использует MySQL как базу
          данных. Все есть на Github:
          <ul>
            <li>
              Фронт —{" "}
              <a href="https://github.com/treepoint/haveDone">
                https://github.com/treepoint/haveDone
              </a>
            </li>
            <li>
              API —{" "}
              <a href="https://github.com/treepoint/haveDoneAPI">
                https://github.com/treepoint/haveDoneAPI
              </a>
            </li>
            <li>
              Скрипты MySQL —{" "}
              <a href="https://github.com/treepoint/haveDoneMySQL">
                https://github.com/treepoint/haveDoneMySQL
              </a>
            </li>
          </ul>
        </p>
        <p>
          После каждого коммита происходит сборка через jenkins. Последняя
          собранная версия автоматически размещается здесь →{" "}
          <a href="https://serveria.ru:3000"> https://serveria.ru:3000</a>
        </p>
        <p>Спасибо за интерес!</p>
      </Page>
    );
  }
}

export default About;
