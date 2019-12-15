import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import { TwitterPicker } from "react-color";
import Action from "./Action/Action";
import ContextMenuBlur from "./ContextMenuBlur/ContextMenuBlur";
//Подключаем изображения иконок и CSS
import iconBold from "../../../../../Images/icon_bold.png";
import iconItalic from "../../../../../Images/icon_italic.png";
import iconBackgroundColor from "../../../../../Images/icon_backgroundColor.png";
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

    this.props.setCellStyle(newState);
  }

  //Выставляем жирное начертание
  setBold() {
    this.assignCellStyle({
      bold: !this.state.cellStyle.bold
    });
  }

  //Выставляем курсивное начертание
  setItalic() {
    this.assignCellStyle({
      italic: !this.state.cellStyle.italic
    });
  }

  //Задаем цвет ячейки
  setCellBackgroundColor(color) {
    this.assignCellStyle({
      backgroundColor: color.hex
    });

    this.showBackgroundColorPicker();
  }

  //Показываем или скрываем выбор цвета заливки
  showBackgroundColorPicker() {
    this.setState({
      isBackgroundColorPickerActive: !this.state.isBackgroundColorPickerActive
    });
  }

  getBackgroundColorPicker() {
    return (
      <div style={{ position: "absolute", top: "51px", left: "71px" }}>
        <TwitterPicker
          className={
            !!this.state.isBackgroundColorPickerActive
              ? "twitterPicker"
              : "twitterPicker hidden"
          }
          onChange={color => this.setCellBackgroundColor(color)}
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
      <div>
        {this.getBlur()}
        <div
          className="contextMenu"
          style={{
            marginLeft: -this.props.scrollLeft + 4 + "px",
            marginTop: -this.props.scrollTop - 36 + "px"
          }}
          tabIndex="1"
          onClick={event => this.onClick(event)}
        >
          <Action
            icon={iconBold}
            isPressed={this.state.cellStyle.bold}
            onClick={() => this.setBold()}
          />
          <Action
            icon={iconItalic}
            isPressed={this.state.cellStyle.italic}
            onClick={() => this.setItalic()}
          />
          <Action
            icon={iconBackgroundColor}
            isPressed={this.state.isBackgroundColorPickerActive}
            onClick={() => this.showBackgroundColorPicker()}
          />
          {this.getBackgroundColorPicker()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scrollTop: state.scrollTop
  };
};

export default connect(mapStateToProps)(ContextMenu);
