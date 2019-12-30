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
    let options = this.state.content.list.map(option => {
      //нам сюда может прийти как html, так и строка. В любом случае конвертим в строку
      let children = HtmlToText.fromString(option.children);

      if (option.value === this.state.content.current) {
        return (
          <option selected value={option.value}>
            {children}
          </option>
        );
      } else {
        return <option value={option.value}>{children}</option>;
      }
    });

    return options;
  }

  render() {
    this.updateContent();

    return (
      <select
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
