import React from "react";
import BroadCastMessage from "../Bottom/BroadCastMessage/BroadCastMessage";

class Bottom extends React.Component {
  render() {
    return (
      <div className="bottom">
        <BroadCastMessage message="Веб-приложение находится в разработке. Рекомендуемый браузер — Firefox. Номер сборки: 0.5.0" />
      </div>
    );
  }
}

export default Bottom;
