import React from "react";
import HtmlToText from "html-to-text";
import IconExpand from "../../../../Images/icon_expand.png";
import "./SelectContent.css";

class SelectContent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: { list: [] }
    };
  }

  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate() {
    this.updateContent();
  }

  updateContent() {
    if (JSON.stringify(this.state.value) !== JSON.stringify(this.props.value)) {
      this.setState({ value: this.props.value });
    }
  }

  onChangeValue(event) {
    let value = this.state.value;
    value.current = Number(event.target.value);
    this.props.onChangeValue(value);
  }

  getOptions() {
    let options = this.state.value.list.map((option, index) => {
      //нам сюда может прийти как html, так и строка. В любом случае конвертим в строку
      return (
        <option value={option.value} key={index}>
          {HtmlToText.fromString(option.children)}
        </option>
      );
    });

    return options;
  }

  render() {
    return (
      <select
        //Задаем значение по умолчанию
        value={this.state.value.current}
        className="selectContent"
        disabled={!!this.props.disabled ? true : false}
        style={{
          width: this.props.width - 1 + "px",
          height: this.props.height + "px",
          background:
            "url(" + IconExpand + ") no-repeat scroll 98% 50% transparent",
          backgroundSize: "20px 20px"
        }}
        onChange={event => this.onChangeValue(event)}
      >
        {this.getOptions()}
      </select>
    );
  }
}

export default SelectContent;
