import React from "react";
import Page from "../../Components/Page/Page";

class Home extends React.Component {
  render() {
    return (
      <Page title="Домашняя страница">
        <div style={{ marginTop: "25vh" }}>
          <center>
            <p>
              Этот проект есть на Github{" "}
              <a href="https://github.com/treepoint/reactFront">
                https://github.com/treepoint/reactFront
              </a>
              .
            </p>
            <p>Спасибо за посещение!</p>
          </center>
        </div>
      </Page>
    );
  }
}

export default Home;
