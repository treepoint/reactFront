import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import { TwitterPicker } from "react-color";
import Action from "../../../../Action/Action";
import ContextMenuBlur from "./ContextMenuBlur/ContextMenuBlur";
//Подключаем изображения иконок и CSS
import iconBold from "../../../../../Images/icon_bold.png";
import iconItalic from "../../../../../Images/icon_italic.png";
import iconBackgroundColor from "../../../../../Images/icon_backgroundColor.png";
import iconBroom from "../../../../../Images/icon_broom.png";
import "./ContextMenu.css";

class ContextMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      cellStyle: {},
      isBackgroundColorPickerActive: false
    };
  }

  componentDidMount() {
    this.setState({ cellStyle: this.props.cellStyle });
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //Склеиваем новое свойство стейта ячейки с текущим стейтом
  assignCellStyle(state) {
    let newState = Object.assign({}, this.state.cellStyle, state);

    this.setState({
      cellStyle: newState
    });

    this.props.onChangeStyle(newState);
  }

  clearCellStyle(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({
      cellStyle: {}
    });

    this.props.onChangeStyle({
      bold: false,
      italic: false,
      backgroundColor: "#f7f7f7"
    });
  }

  //Выставляем жирное начертание
  setBold(event) {
    event.preventDefault();
    event.stopPropagation();

    this.assignCellStyle({
      bold: !this.state.cellStyle.bold
    });
  }

  //Выставляем курсивное начертание
  setItalic(event) {
    event.preventDefault();
    event.stopPropagation();

    this.assignCellStyle({
      italic: !this.state.cellStyle.italic
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
      <div style={{ position: "absolute", top: "51px", left: "71px" }}>
        <TwitterPicker
          colors={[
            "#88d154", //Бодряще зеленый
            "#74bce5", //Уверенно голубой
            "#ffd966", //Солнечно желтый
            "#fc9558", //Подгорающе оранжевый
            "#F78DA7", //Опасно красный
            "#EB144C", //Конечности в огне
            "#cccccc", //Серый как твоя жизнь
            "#303030", //Темно серый, как это описание
            "#8174e5", //Цвет Донателло
            "#f7f7f7" //По умолчанию
          ]}
          className={
            !!this.state.isBackgroundColorPickerActive
              ? "twitterPicker"
              : "twitterPicker hidden"
          }
          onChange={(color, event) => this.setCellBackgroundColor(color, event)}
        />
      </div>
    );
  }

  getBlur() {
    return (
      <ContextMenuBlur
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
    return (
      <React.Fragment>
        {this.getBlur()}
        <div
          className="contextMenu"
          style={{
            marginLeft: -this.props.scrollLeft + 4 + "px",
            marginTop: -this.props.scrollTop - 36 + "px"
          }}
          tabIndex="1"
          onClick={event => this.onClick(event)}
          onWheel={event => {
            this.props.onWheel(event);
          }}
        >
          <Action
            icon={iconBold}
            isPressed={this.state.cellStyle.bold}
            onClick={event => this.setBold(event)}
          />
          <Action
            icon={iconItalic}
            isPressed={this.state.cellStyle.italic}
            onClick={event => this.setItalic(event)}
          />
          <Action
            icon={iconBackgroundColor}
            isPressed={this.state.isBackgroundColorPickerActive}
            onClick={event => this.showBackgroundColorPicker(event)}
          />
          <Action
            icon={iconBroom}
            onClick={event => this.clearCellStyle(event)}
          />
          {this.getBackgroundColorPicker()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    scrollTop: state.scrollTop,
    scrollLeft: state.scrollLeft
  };
};

export default connect(mapStateToProps)(ContextMenu);
