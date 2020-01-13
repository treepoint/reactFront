import React from "react";
import HtmlToText from "html-to-text";
import Select from "react-select";
import "./SelectContent.css";

class SelectContent extends React.Component {
  constructor() {
    super();
    this.state = {
      value: { list: [], isOpened: false }
    };
  }

  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate() {
    this.updateContent();
  }

  onFocus() {
    this.setState({ isOpened: true });
  }

  onBlur() {
    this.setState({ isOpened: false });
  }

  updateContent() {
    if (JSON.stringify(this.state.value) !== JSON.stringify(this.props.value)) {
      this.setState({ value: this.props.value });
    }
  }

  onChangeValue(option) {
    let value = this.state.value;
    value.current = Number(option.value);
    this.props.onChangeValue(value);
  }

  getOptions() {
    if (this.state.value === null) {
      return null;
    }

    let options = this.state.value.list.map((option, index) => {
      //нам сюда может прийти как html, так и строка. В любом случае конвертим в строку
      let label = HtmlToText.fromString(option.label);

      let style = {};

      if (typeof option.style !== "undefined") {
        style = option.style;

        if (style === null) {
          style = {};
        }

        //Задаем дефолтное отображение
        if (typeof style.backgroundColor === "undefined") {
          style.backgroundColor = "#f7f7f7";
        }
      }

      return {
        value: option.value,
        label: label,
        style: style
      };
    });

    return options;
  }

  render() {
    const colourStyles = {
      control: (styles, state) => ({
        ...styles,
        border: "none",
        opacity: !!this.props.isMinimized ? "0.6" : "1",
        width: !!this.props.isMinimized ? "28px" : "inherit",
        borderRadius: "none",
        minHeight: "34px",
        transition: "all",
        height: this.props.height + "px",
        boxShadow: "none",
        outline: !!state.isFocused ? "1px solid rgb(96, 191, 255)" : "none",
        outlineOffset: "-1px",
        borderLeft: "8px solid " + state.selectProps.controlColor,
        fontWeight: !!state.selectProps.isBold ? "900" : "200",
        fontStyle: !!state.selectProps.isItalic ? "italic" : "normal",
        borderColor: state.selectProps.controlColor + " !important"
      }),
      dropdownIndicator: styles => ({
        ...styles,
        height: "34px",
        paddingLeft: 0,
        paddingRight: !!this.props.isMinimized ? 0 : 6
      }),
      indicatorSeparator: styles => ({}),
      option: (styles, { data, isFocused, isSelected }) => ({
        ...styles,
        fontFamily: '"Open Sans", "Source Sans Pro"',
        fontSize: "15px",
        color: "000000",
        minHeight: "32px",
        paddingLeft: "6px",
        borderRight: !!isSelected ? "1px solid #d2d2d2" : "none",
        borderLeft: "8px solid " + data.style.backgroundColor,
        fontWeight: !!data.style.bold ? "900" : "200",
        fontStyle: !!data.style.italic ? "italic" : "normal",
        backgroundColor: !!isSelected
          ? "rgb(240, 240, 240)"
          : isFocused
          ? "rgba(96, 191, 255, 0.17)"
          : "none"
      }),
      menu: styles => ({
        ...styles,
        borderRadius: 0,
        border: "none",
        marginTop: "0px",
        outline: "1px solid #d2d2d2",
        outlineTop: "none",
        outlineOffset: "-1px",
        width: !!this.props.isMinimized ? "max-content" : "inherit"
      }),
      valueContainer: styles => ({
        ...styles,
        padding: !!this.props.isMinimized ? "0" : "2px 4px"
      }),
      singleValue: styles => ({
        ...styles,
        maxWidth: "calc(100% - 5px)",
        paddingRight: "2px"
      }),
      noOptionsMessage: styles => ({
        ...styles,
        fontFamily: '"Open Sans", "Source Sans Pro"',
        fontSize: "15px"
      })
    };

    //Получаем список опций
    let options = this.getOptions();

    let currentValue;

    if (options !== null) {
      //Получаем текущую опцию
      currentValue = options.find(option => {
        return option.value === this.state.value.current;
      });
    }

    //Получим стиль текущей ячейки
    let style = {};

    if (typeof currentValue !== "undefined" && currentValue !== null) {
      style = currentValue.style;
    }

    return (
      <React.Fragment>
        <Select
          options={options}
          classNamePrefix="selectContent"
          controlColor={style.backgroundColor}
          isBold={style.bold}
          isItalic={style.italic}
          isSearchable={!this.props.isMinimized}
          value={currentValue}
          menuPlacement="auto"
          closeMenuOnScroll={event => {
            return (
              !!!(event.target.classList.value.indexOf("selectContent") + 1) &&
              this.state.isOpened
            );
          }}
          noOptionsMessage={() => {
            return "Нет совпадений :(";
          }}
          placeholder=""
          menuPosition="fixed"
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChange={option => this.onChangeValue(option)}
          styles={colourStyles}
        />
      </React.Fragment>
    );
  }
}

export default SelectContent;
