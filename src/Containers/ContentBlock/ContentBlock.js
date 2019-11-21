import React from "react";
import "./contentBlock.css";

//TODO: переделать это в нормальную страницу

class ContentBlock extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="pagination">домашняя страница</div>
        <div className="hr" />
        <article style={{ textAlign: "center", marginTop: "25%" }}>
          <p>
            This project has habitation on Github
            (https://github.com/treepoint/reactFront).
          </p>

          <p>Thanks for watching!</p>
        </article>
      </div>
    );
  }
}

export default ContentBlock;
