import React from "react";
import "./ErrorMessage.css";

class ErrorMessage extends React.PureComponent {
  render() {
    return (
      <div
        className={"errorMessage" + (!!this.props.isWarning ? " warning" : "")}
        style={{
          //Если нет сообщения — скрываем отображение
          display: !!this.props.message ? "" : "none"
        }}
      >
        {this.props.message}
      </div>
    );
  }
}

export default ErrorMessage;
