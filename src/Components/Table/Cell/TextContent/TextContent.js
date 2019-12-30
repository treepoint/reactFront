import React from "react";
import { debounce } from "lodash";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import ContentEditable from "react-contenteditable";
import ContextMenu from "./ContextMenu/ContextMenu";
import WideEditAreaBlur from "./WideEditAreaBlur/WideEditAreaBlur";
import "./TextContent.css";

class TextContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contextMenuIsHidden: true,
      wideEditAreaIsHidden: true
    };
  }

  //Изменяем контент по вводу
  onChange = debounce(event => {
    this.props.onChange(event.target.value);
  }, 700);

  //Обрабатываем изменения стиля контента в ячейке в
  //зависимости от того, что было задано в контекстном меню
  setStyle(style) {
    this.props.setStyle(style);
  }

  //Срабатывает при вызове контекстного меню
  showContextMenu(event) {
    //Если не отключена возможно редактировать контент, и не отключена стилизация
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

  hideAllEditing() {
    //Скроем контекстное меню
    this.setContextMenuHidden();
    //Скроем большую форму редактирования
    this.setWideEditAreaHidden();
  }

  //Скроем контекстное меню
  setContextMenuHidden() {
    this.setState({
      contextMenuIsHidden: true
    });
  }

  //Скроем большую форму редактирования
  setWideEditAreaHidden() {
    this.setState({
      wideEditAreaIsHidden: true
    });
  }

  //Получаем стиль ячейки заголовка на основании стиля контента
  getHeaderStyle() {
    let style;

    style = {
      fontWeight: "900",
      width: this.props.width - 4 + "px",
      height: this.props.height - 12 + "px",
      color: "#000"
    };

    return style;
  }

  //Получаем стиль обычной ячейки на основании стиля контента
  getRegularStyle() {
    return {
      //Подгоняем размеры внутреннего контента по размеры ячейки, но компенсируем отступы и бордюры
      marginLeft: !!this.state.wideEditAreaIsHidden
        ? 0 + "px"
        : -this.props.scrollLeft + "px",
      marginTop: !!this.state.wideEditAreaIsHidden
        ? 0 + "px"
        : -this.props.scrollTop + "px",
      width: this.props.width - 5 + "px",
      height: this.props.height - 12 + "px",
      background: !!this.props.disabled
        ? "rgb(251, 251, 251)"
        : this.props.style.backgroundColor,
      fontWeight: !!this.props.style.bold ? "900" : "200",
      fontStyle: !!this.props.style.italic ? "italic" : "normal",
      color: !!this.props.disabled ? "#444" : "#000"
    };
  }

  //Срабатывает при потере фокуса в том числе
  hideWideEditArea() {
    this.setState({
      wideEditAreaIsHidden: true
    });
  }

  //Срабатывает при двойном клике
  showWideEditArea() {
    if (this.props.disabled || this.props.isHeader) {
      return;
    }

    this.setState({
      wideEditAreaIsHidden: false,
      contextMenuIsHidden: true
    });
  }

  getClassName() {
    let className = "textContent";
    if (!this.state.wideEditAreaIsHidden) {
      className = className + " chosen";
    }
    return className;
  }

  //Получаем контент ячейки в зависимости от того шапка таблицы это или обычная ячейка
  getCellContent() {
    return (
      <ContentEditable
        ref="textarea"
        spellCheck="false"
        className={this.getClassName()}
        style={
          !!this.props.isHeader ? this.getHeaderStyle() : this.getRegularStyle()
        }
        //Задаем контент
        html={this.props.content}
        //Задаем редактируемость
        disabled={!!this.props.disabled ? true : false}
        onChange={event => this.onChange(event)}
        //Обрабатываем двойной клик
        onDoubleClick={event => this.showWideEditArea(event)}
        //Обрабатываем контекстное меню
        onContextMenu={event => this.showContextMenu(event)}
        //Обрабатываем прокрутку
        onWheel={event => this.hideAllEditing(event)}
      ></ContentEditable>
    );
  }

  //Контекстное меню рисуем только если нужно
  getContextMenu() {
    if (!this.state.contextMenuIsHidden) {
      return (
        <ContextMenu
          scrollLeft={this.props.scrollLeft}
          cellStyle={this.props.style}
          setContextMenuHidden={event => this.setContextMenuHidden(event)}
          setCellStyle={style => this.setStyle(style)}
          onWheel={event => this.setContextMenuHidden(event)}
        />
      );
    }
  }

  //Получим блюр для зоны редактирования
  getWideEditAreaBlur() {
    if (!this.state.wideEditAreaIsHidden) {
      return (
        <WideEditAreaBlur
          onClick={() => {
            this.hideAllEditing();
          }}
          onContextMenu={event => {
            this.showContextMenu(event);
          }}
        />
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.getContextMenu()}
        {this.getCellContent()}
        {this.getWideEditAreaBlur()}
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

export default connect(mapStateToProps)(TextContent);
