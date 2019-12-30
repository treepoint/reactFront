import React from "react";
import { DebounceInput } from "react-debounce-input";
import "./StringContent.css";

class StringContent extends React.Component {
  //Изменяем контент по вводу
  onChange(event) {
    this.props.onChangeStringContent(event.target.value);
  }

  //Получаем стиль ячейки заголовка на основании стиля контента
  getStyle() {
    let style;

    if (!!this.props.isHeader) {
      style = {
        width: this.props.width - 7 + "px",
        height: this.props.height - 2 + "px",
        fontWeight: "900",
        background: "rgb(243, 243, 243)",
        color: "#000"
      };
    } else {
      style = {
        width: this.props.width - 6 + "px",
        height: this.props.height - 2 + "px",
        fontWeight: "200"
      };
    }

    return style;
  }

  render() {
    return (
      <DebounceInput
        disabled={!!this.props.disabled ? true : false}
        className="stringContent"
        style={this.getStyle()}
        debounceTimeout={700}
        value={this.props.stringContent}
        onChange={event => this.onChange(event)}
      />
    );
  }
}

export default StringContent;
