import React from "react";
import InputMask from "react-input-mask";
import "./TimeContent.css";

class TimeContent extends React.Component {
  onChange(event) {
    // event.target.value;

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
        background: "rgb(224, 224, 224)",
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
    let value;

    if (this.props.stringContent === null) {
      value = "00:00";
    } else {
      value = this.props.stringContent;
    }

    return (
      <InputMask
        mask="99:99"
        maskChar="0"
        disabled={!!this.props.disabled ? true : false}
        className="timeContent"
        style={this.getStyle()}
        defaultValue={value}
        onChange={event => this.onChange(event)}
      />
    );
  }
}

export default TimeContent;
