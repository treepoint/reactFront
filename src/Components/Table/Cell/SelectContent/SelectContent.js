import React from "react";
import HtmlToText from "html-to-text";
import IconExpand from "../../../../Images/icon_expand.png";
import "./SelectContent.css";

class SelectContent extends React.Component {
  constructor() {
    super();
    this.state = {
      content: { list: [] }
    };
  }

  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate() {
    this.updateContent();
  }

  updateContent() {
    if (
      JSON.stringify(this.state.content) !== JSON.stringify(this.props.content)
    ) {
      this.setState({ content: this.props.content });
    }
  }

  onChange(event) {
    let content = this.state.content;
    content.current = Number(event.target.value);
    this.props.onChange(content);
  }

  getOptions() {
    let options = this.state.content.list.map((option, index) => {
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
        value={this.state.content.current}
        className="selectContent"
        disabled={!!this.props.disabled ? true : false}
        style={{
          width: this.props.width - 1 + "px",
          height: this.props.height + "px",
          background:
            "url(" + IconExpand + ") no-repeat scroll 98% 50% transparent",
          backgroundSize: "20px 20px"
        }}
        onChange={event => this.onChange(event)}
      >
        {this.getOptions()}
      </select>
    );
  }
}

export default SelectContent;
