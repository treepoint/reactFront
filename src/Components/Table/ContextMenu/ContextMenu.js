import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import { TwitterPicker } from "react-color";
import Action from "./Action/Action";
//Подключаем изображения иконок и CSS
import iconBold from "../../../Images/icon_bold.png";
import iconItalic from "../../../Images/icon_italic.png";
import iconBackgroundColor from "../../../Images/icon_backgroundColor.png";
import "./ContextMenu.css";

class ContextMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      cellStyle: {},
      isBackgroundPickerActive: false
    };
  }

  componentDidMount() {
    this.setState({ cellStyle: this.props.cellStyle });
  }

  onClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //Выставляем жирное начертание
  setBold() {
    let cellStyle = Object.assign({}, this.state.cellStyle, {
      bold: !this.state.cellStyle.bold
    });

    this.setState({
      cellStyle: cellStyle
    });

    this.props.setCellStyle(cellStyle);
  }

  //Выставляем курсивное начертание
  setItalic() {
    let cellStyle = Object.assign({}, this.state.cellStyle, {
      italic: !this.state.cellStyle.italic
    });

    this.setState({
      cellStyle: cellStyle
    });

    this.props.setCellStyle(cellStyle);
  }

  //Задаем цвет ячейки
  setCellBackgroundColor(color) {
    let cellStyle = Object.assign({}, this.state.cellStyle, {
      backgroundColor: color.hex
    });

    this.setState({
      cellStyle: cellStyle,
      isBackgroundPickerActive: false
    });

    this.props.setCellStyle(cellStyle);
  }

  //Показываем или скрываем выбор цвета заливки
  showBackgroundColorPicker() {
    this.setState({
      isBackgroundPickerActive: !this.state.isBackgroundPickerActive
    });
  }

  render() {
    console.log(this.props.scrollTop);
    return (
      <div>
        <div
          className={"blurContextMenu"}
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
        <div
          style={{
            marginLeft: -this.props.scrollLeft + 4 + "px",
            marginTop: -this.props.scrollTop - 36 + "px"
          }}
          tabIndex="1"
          className="contextMenu"
          onClick={event => this.onClick(event)}
        >
          <Action
            icon={iconBold}
            isPressed={!!this.state.cellStyle.bold ? true : false}
            onClick={() => this.setBold()}
          />
          <Action
            icon={iconItalic}
            isPressed={!!this.state.cellStyle.italic ? true : false}
            onClick={() => this.setItalic()}
          />
          <Action
            icon={iconBackgroundColor}
            isPressed={!!this.state.isBackgroundPickerActive ? true : false}
            onClick={() => this.showBackgroundColorPicker()}
          />
          <div style={{ position: "absolute", top: "51px", left: "83px" }}>
            <TwitterPicker
              className={
                !!this.state.isBackgroundPickerActive
                  ? "twitterPicker"
                  : "twitterPicker hidden"
              }
              color={"#f7f7f7"}
              onChange={color => this.setCellBackgroundColor(color)}
            />
          </div>
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
