import React from "react";
import BroadCastMessage from "../Bottom/BroadCastMessage/BroadCastMessage";

class Bottom extends React.Component {
  render() {
    return (
      <div className="bottom">
        <BroadCastMessage message="Веб-приложение находится в разработке. Номер сборки: 0.3.5" />
      </div>
    );
  }
}

export default Bottom;
