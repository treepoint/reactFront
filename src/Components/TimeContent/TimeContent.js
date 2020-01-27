import React from "react";
import TimeField from "react-simple-timefield";
import "./TimeContent.css";

class TimeContent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "00:00",
      isReadOnly: false
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate() {
    if (this.state.value !== this.props.value && !this.state.isReadOnly) {
      this.setState({ value: this.props.value });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.value !== this.state.value) {
      return true;
    }

    if (nextProps.value !== this.props.value) {
      return true;
    }

    if (nextProps.height !== this.props.height) {
      return true;
    }

    if (nextProps.width !== this.props.width) {
      return true;
    }
    
    return false;
  }

  onFocus() {
    this.setState({ isReadOnly: true });
  }

  onChangeValue(event) {
    this.setState({ value: event.target.value });
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.onChangeValue(this.state.value);
      this.setState({ isReadOnly: false });
    }
  }

  onBlur() {
    if (this.state.value !== this.props.value) {
      this.props.onChangeValue(this.state.value);
    }

    this.setState({ isReadOnly: false });
  }

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
        value={this.state.value}
        disabled={!!this.props.disabled ? true : false}
        className={
          !!this.props.isStandalone ? "timeContent standalone" : "timeContent"
        }
        style={this.getStyle()}
        onFocus={event => this.onFocus(event)}
        onChange={event => this.onChangeValue(event)}
        onBlur={event => this.onBlur(event)}
        onKeyPress={event => this.onKeyPress(event)}
      />
    );
  }
}

export default TimeContent;
