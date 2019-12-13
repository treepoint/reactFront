import React from "react";
import ContentEditable from "react-contenteditable";
import ContextMenu from "../../ContextMenu/ContextMenu";
import "./RegularCellContent.css";

class RegularCellContent extends React.Component {
  constructor() {
    super();
    this.state = {
      className: "regularCellContent",
      contextMenuIsHidden: true
    };
  }

  //Изменяем контент по вводу
  onChange(event) {
    this.props.setHtmlContent(event.target.value);
  }

  //Обрабатываем изменения стиля контента в ячейке в
  //зависимости от того, что было задано в контекстном меню
  setStyle(style) {
    this.props.setStyle(style);
  }

  //Срабатывает при вызове контекстного меню
  showContextMenu(event) {
    if (!this.props.disabled) {
      event.preventDefault();
      this.setState({ contextMenuIsHidden: false });
    }
  }

  //Скроем контекстное меню
  setContextMenuHidden() {
    this.setState({
      contextMenuIsHidden: true
    });
  }

  //Задаем стиль ячейки на основании стиля контента
  getStyle() {
    return {
      //Подгоняем размеры внутреннего контента по размеры ячейки, но компенсируем отступы и бордюры
      width: this.props.width - 5 + "px",
      height: this.props.height - 12 + "px",
      background: this.props.style.backgroundColor,
      fontWeight: !!this.props.style.bold ? "900" : "200",
      fontStyle: !!this.props.style.italic ? "italic" : "normal"
    };
  }

  //Срабатывает при потере фокуса
  setDefaultClassName() {
    this.setState({
      className: "regularCellContent"
    });
  }

  //Срабатывает при двойном клике
  setChosenClassName() {
    if (this.props.disable) {
      return;
    }

    this.setState({ className: "regularCellContent chosen" });
  }

  render() {
    //Контекстное меню рисуем только если нужно
    let contextMenu;

    if (!this.state.contextMenuIsHidden) {
      contextMenu = (
        <ContextMenu
          className={this.state.contextMenuClassName}
          cellStyle={this.props.style}
          setContextMenuHidden={event => this.setContextMenuHidden(event)}
          setCellStyle={style => this.setStyle(style)}
        />
      );
    }

    return (
      <div>
        {contextMenu}
        <ContentEditable
          spellCheck="false"
          className={this.state.className}
          style={this.getStyle()}
          //Задаем контент
          html={this.props.htmlContent}
          //Задаем редактируемость
          disabled={this.props.disabled}
          onChange={event => this.onChange(event)}
          //Обрабатываем двойной клик
          onDoubleClick={event => this.setChosenClassName(event)}
          //При уходе фокуса задаем стандартный стиль. Нужно чтобы сбросить последствия двойного клика
          onBlur={event => this.setDefaultClassName(event)}
          //Обрабатываем контекстное меню
          onContextMenu={event => this.showContextMenu(event)}
        ></ContentEditable>
      </div>
    );
  }
}

export default RegularCellContent;
