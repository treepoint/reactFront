import React from "react";
import BroadCastMessage from "../Bottom/BroadCastMessage/BroadCastMessage";

class Bottom extends React.Component {
  render() {
    return (
      <div className="bottom">
        <BroadCastMessage message="Веб-приложение находится в разработке. Номер сборки: 0.2.1" />
      </div>
    );
  }
}

export default Bottom;
