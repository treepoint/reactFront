import React from "react";
import Page from "../../Components/Page/back/Page";

class About extends React.Component {
  render() {
    return (
      <Page title="Справка">
        <center>
          <p>
            Этот проект написан на React и есть на Github{" "}
            <a href="https://github.com/treepoint/reactFront">
              https://github.com/treepoint/reactFront
            </a>
            .
          </p>
          <p>Спасибо за посещение!</p>
        </center>
      </Page>
    );
  }
}

export default About;
