import React from "react";
//Подключаем компоненты
import { CirclePicker } from "react-color";
import Action from "../../Action/Action";
import Blur from "../../Blur/Blur";
//Подключаем изображения иконок и CSS
import iconBackgroundColor from "../../../Images/icon_backgroundColor.png";
import iconBroom from "../../../Images/icon_broom.png";
import "./ContextMenu.css";

class ContextMenu extends React.Component {
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
    let newState = Object.assign(
      {},
      {
        //Пока bold и italic оставим как атавизмы, но потом можно будет и удалить
        bold: this.props.bold,
        italic: this.props.italic,
        backgroundColor: this.props.backgroundColor
      },
      state
    );

    this.props.onChangeStyle(newState);
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
      <div style={{ position: "absolute", top: "81px", left: "-22px" }}>
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
    return (
      <Blur
        onClick={event => {
          this.props.setContextMenuHidden(event);
          this.setState({
            isBackgroundPickerActive: false
          });
        }}
        onContextMenu={event => {
          event.preventDefault(event);
          this.setState({
            isBackgroundPickerActive: false
          });
          this.props.setContextMenuHidden(event);
        }}
      />
    );
  }

  render() {
    const actionStyle = {
      marginLeft: "2px",
      marginTop: "2px",
      marginRight: "4px"
    };

    return (
      <React.Fragment>
        {this.getBlur()}
        <div
          className="contextMenu"
          style={{
            marginLeft: -this.props.scrollLeft + 4 + "px",
            marginTop: -this.props.scrollTop - 37 + "px"
          }}
          tabIndex="1"
          onClick={event => this.onClick(event)}
          onWheel={event => {
            this.props.onWheel(event);
          }}
        >
          <Action
            icon={iconBackgroundColor}
            style={actionStyle}
            isPressed={this.state.isBackgroundColorPickerActive}
            onClick={event => this.showBackgroundColorPicker(event)}
          />
          <Action
            icon={iconBroom}
            style={actionStyle}
            onClick={event => this.clearCellStyle(event)}
          />
          {this.getBackgroundColorPicker()}
        </div>
      </React.Fragment>
    );
  }
}

export default ContextMenu;
