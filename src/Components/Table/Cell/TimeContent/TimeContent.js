import React from "react";
import { debounce } from "lodash";
import TimeField from "react-simple-timefield";
import "./TimeContent.css";

class TimeContent extends React.Component {
  onChangeValue = debounce(event => {
    this.props.onChangeValue(event.target.value);
  }, 700);

  //Получаем стиль ячейки заголовка на основании стиля контента
  getStyle() {
    let style;

    //Вот такого делать никогда не нужно. Но если очень хочется — все равно не надо
    //Они держат мою жену в заложниках и сказали сделать быстро, поэтому так

    let isChrome = false;

    if (navigator.userAgent.indexOf("Chrome") + 1) {
      isChrome = true;
    }

    if (!!this.props.isHeader) {
      style = {
        width: this.props.width - (!!isChrome ? 7 : 9) + "px",
        height: this.props.height - 2 + "px",
        fontWeight: "900",
        background: "rgb(243, 243, 243)",
        color: "#000"
      };
    } else {
      style = {
        width: this.props.width - (!!isChrome ? 7 : 8) + "px",
        height: this.props.height - 2 + "px",
        fontWeight: "200"
      };
    }

    return style;
  }

  render() {
    return (
      <TimeField
        value={this.props.value}
        disabled={!!this.props.disabled ? true : false}
        className="timeContent"
        style={this.getStyle()}
        onChange={event => this.onChangeValue(event)}
      />
    );
  }
}

export default TimeContent;
