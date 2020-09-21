import React from "react";
//Подключаем компоненты
import { CirclePicker } from "react-color";
import Action from "../../Action/Action";
import Blur from "../../Blur/Blur";
//Подключаем изображения иконок и CSS
import iconBackgroundColor from "../../../Images/icon_backgroundColor.png";
import "./ChangeCellColorMenu.css";

class ChangeCellColorMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      isBackgroundColorPickerActive: false
    };
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //Склеиваем новое свойство стейта ячейки с текущим стейтом
  assignCellStyle(state) {
    let newStyle = Object.assign(
      {},
      {
        //Пока bold и italic оставим как атавизмы, но потом можно будет и удалить
        bold: this.props.bold,
        italic: this.props.italic,
        backgroundColor: this.props.backgroundColor
      },
      state
    );

    this.props.onChangeStyle(newStyle);
  }

  clearCellStyle(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.onChangeStyle({
      //Пока bold и italic оставим как атавизмы, но потом можно будет и удалить
      bold: false,
      italic: false,
      backgroundColor: "#f7f7f7"
    });
  }

  //Задаем цвет ячейки
  setCellBackgroundColor(color, event) {
    this.assignCellStyle({
      backgroundColor: color.hex
    });

    this.showBackgroundColorPicker(event);
  }

  //Показываем или скрываем выбор цвета заливки
  showBackgroundColorPicker(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      isBackgroundColorPickerActive: !this.state.isBackgroundColorPickerActive
    });
  }

  getBackgroundColorPicker() {
    return (
      <div style={{ position: "absolute", top: "45px", left: "15px", zIndex: "10" }}>
        <CirclePicker
          className={
            !!this.state.isBackgroundColorPickerActive
              ? "circle-picker"
              : "circle-picker hidden"
          }
          onChange={(color, event) => this.setCellBackgroundColor(color, event)}
        />
      </div>
    );
  }

  getBlur() {
    if (this.state.isBackgroundColorPickerActive) {
      return (
        <Blur
          onClick={event => {
            this.setState({
              isBackgroundColorPickerActive: false
            });
          }}
        />
      );
    }
  }

  getBackgroundColorAction() {
    if (this.props.isStylable) {
      return (
        <Action
          icon={iconBackgroundColor}
          style={{ marginLeft: "2px" }}
          onClick={event => this.showBackgroundColorPicker(event)}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getBlur()}
        <div className="changeCellColorMenuWrapper">
          <div
            className="editTextContentMenu"
            style={{
              marginLeft: -this.props.scrollLeft + 4 + "px",
              marginTop: -this.props.scrollTop - 37 + "px"
            }}
            tabIndex="1"
            onClick={event => this.onClick(event)}
            onWheel={event => {
              this.showBackgroundColorPicker(event);
            }}
          >
            {this.getBackgroundColorAction()}
          </div>
          {this.getBackgroundColorPicker()}
        </div>
      </React.Fragment>
    );
  }
}

export default ChangeCellColorMenu;
