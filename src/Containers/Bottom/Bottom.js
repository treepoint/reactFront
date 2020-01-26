import React from "react";
import BroadCastMessage from "../../Components/BroadCastMessage/BroadCastMessage";

class Bottom extends React.Component {
  render() {
    return (
      <div className="bottom">
        <BroadCastMessage message="Веб-приложение находится в разработке. Рекомендуемый браузер — Firefox. Номер сборки: 0.6.2" />
      </div>
    );
  }
}

export default Bottom;
