import React from "react";
import HtmlToText from "html-to-text";
import "./SelectContent.css";

class SelectContent extends React.Component {
  constructor() {
    super();
    this.state = {
      htmlContent: { list: [] }
    };
  }

  componentDidMount() {
    this.updateHtmlContent();
  }

  updateHtmlContent() {
    if (
      JSON.stringify(this.state.htmlContent) !==
      JSON.stringify(this.props.htmlContent)
    ) {
      this.setState({ htmlContent: this.props.htmlContent });
    }
  }

  onChange(event) {
    let htmlContent = this.state.htmlContent;
    htmlContent.current = Number(event.target.value);
    this.props.onChangeHTMLContent(htmlContent);
  }

  getOptions() {
    let options = this.state.htmlContent.list.map(option => {
      //нам сюда может прийти как html, так и строка. В любом случае конвертим в строку
      let children = HtmlToText.fromString(option.children);

      if (option.value === this.state.htmlContent.current) {
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
    this.updateHtmlContent();

    return (
      <select
        className="selectContent"
        disabled={!!this.props.disabled ? true : false}
        style={{
          width: this.props.width,
          height: this.props.height
        }}
        onChange={event => this.onChange(event)}
      >
        {this.getOptions()}
      </select>
    );
  }
}

export default SelectContent;
