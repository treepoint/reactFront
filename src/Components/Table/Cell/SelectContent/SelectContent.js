import React from "react";
import HtmlToText from "html-to-text";
import Select from "react-select";
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

  onChangeValue(option) {
    let value = this.state.value;
    value.current = Number(option.value);
    this.props.onChangeValue(value);
  }

  getOptions() {
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
        borderRadius: "none",
        minHeight: "34px",
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
        paddingRight: 6
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
        outlineOffset: "-1px"
      }),
      valueContainer: styles => ({
        ...styles,
        padding: "2px 4px"
      }),
      singleValue: styles => ({
        ...styles,
        maxWidth: "calc(100% - 5px)",
        paddingRight: "2px"
      })
    };

    //Получаем список опций
    let options = this.getOptions();

    //Получаем текущую опцию
    let currentValue = options.find(option => {
      return option.value === this.state.value.current;
    });

    //Получим стиль текущей ячейки
    let style = {};

    if (typeof currentValue !== "undefined") {
      style = currentValue.style;
    }

    return (
      <Select
        menuPortalTarget={document.querySelector("body")}
        options={options}
        controlColor={style.backgroundColor}
        isBold={style.bold}
        isItalic={style.italic}
        value={currentValue}
        noOptionsMessage={() => {
          return "Нет совпадений :(";
        }}
        placeholder=""
        onChange={option => this.onChangeValue(option)}
        styles={colourStyles}
      />
    );
  }
}

export default SelectContent;
