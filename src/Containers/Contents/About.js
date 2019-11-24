import React from "react";
import Page from "../../Components/Page/Page";

class About extends React.Component {
  render() {
    return (
      <Page title="Справка">
        <p>
          Этот проект написан на React и есть на Github →{" "}
          <a href="https://github.com/treepoint/reactFront">
            https://github.com/treepoint/reactFront
          </a>
          .
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
