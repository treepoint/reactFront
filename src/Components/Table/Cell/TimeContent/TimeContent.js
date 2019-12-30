import React from "react";
import { debounce } from "lodash";
import TimeField from "react-simple-timefield";
import "./TimeContent.css";

class TimeContent extends React.Component {
  onChange = debounce(event => {
    this.props.onChange(event.target.value);
  }, 700);

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
      <TimeField
        value={this.props.content}
        disabled={!!this.props.disabled ? true : false}
        className="timeContent"
        style={this.getStyle()}
        onChange={event => this.onChange(event)}
      />
    );
  }
}

export default TimeContent;
