import React from "react";
import "./StringContent.css";

class StringContent extends React.Component {
  constructor() {
    super();
    this.state = {
      stringContent: { list: [] }
    };
  }

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
    return (
      <input
        disabled={!!this.props.disabled ? true : false}
        className="stringContent"
        style={this.getStyle()}
        defaultValue={this.props.stringContent}
        onChange={event => this.onChange(event)}
      />
    );
  }
}

export default StringContent;
