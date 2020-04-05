import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import ContextMenu from "./ContextMenu/ContextMenu";
import TextareaScrollbar from "../TextareaScrollbar/TextareaScrollbar";
//Подключаем красивые скроллы
import "./TextContent.css";

class TextContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contextMenuIsHidden: true,
      isChrome: this.isChrome(),
    };
  }

  isChrome() {
    return navigator.userAgent.indexOf("Chrome") + 1;
  }

  //Срабатывает при вызове контекстного меню
  showContextMenu(event) {
    //Если не отключена возможность редактировать контент, и не отключена стилизация и это не шапка
    if (
      !this.props.disabled &&
      !!this.props.isStylable &&
      !this.props.isHeader
    ) {
      event.stopPropagation();
      event.preventDefault();
      this.setState({ contextMenuIsHidden: !this.state.contextMenuIsHidden });
    }
  }

  //Получаем стиль ячейки заголовка на основании стиля контента
  getStyle() {
    if (this.props.isHeader) {
      return {
        fontWeight: "900",
        color: "#000",
        marginTop: "0px",
      };
    } else {
      return {
        backgroundColor: !!this.props.isStandalone
          ? "fff"
          : !!this.props.disabled
          ? "rgb(251, 251, 251)"
          : null,
        borderLeft: !!this.props.isStylable
          ? "8px solid " + this.props.backgroundColor
          : "none",
        fontWeight: !!this.props.bold ? "900" : "200",
        fontStyle: !!this.props.italic ? "italic" : "normal",
        color: !!this.props.disabled ? "#444" : "#000",
      };
    }
  }

  //Получаем контент ячейки в зависимости от того шапка таблицы это или обычная ячейка
  getCellContent() {
    return (
      <TextareaScrollbar
        isHaveError={this.props.isHaveError}
        autoFocus={this.props.autoFocus}
        style={this.getStyle()}
        placeholder={this.props.placeholder}
        height={this.props.height}
        width={
          !!this.props.width
            ? this.props.width - (!!this.state.isChrome ? 2 : 1)
            : undefined
        }
        spellCheck="false"
        value={this.props.value}
        isStylable={this.props.isStylable}
        onFocus={() => this.setState({ isReadOnly: true })}
        disabled={!!this.props.disabled ? true : false}
        onChange={(value) => this.props.onChangeValue(value)}
        //Обрабатываем контекстное меню
        onContextMenu={(event) => this.showContextMenu(event)}
      />
    );
  }

  //Контекстное меню рисуем только если нужно
  getContextMenu() {
    if (!this.state.contextMenuIsHidden) {
      return (
        <ContextMenu
          scrollLeft={!!this.props.isFixed ? 0 : this.props.scrollLeft}
          scrollTop={!!this.props.isFixed ? 0 : this.props.scrollTop}
          //Настройки стиля
          bold={this.props.bold}
          italic={this.props.italic}
          backgroundColor={this.props.backgroundColor}
          //Функции
          setContextMenuHidden={() =>
            this.setState({
              contextMenuIsHidden: true,
            })
          }
          onChangeStyle={(style) => this.props.onChangeStyle(style)}
          onWheel={(event) => this.setContextMenuHidden(event)}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getContextMenu()}
        {this.getCellContent()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scrollTop: state.scrollTop,
    scrollLeft: state.scrollLeft,
  };
};

export default connect(mapStateToProps)(TextContent);
