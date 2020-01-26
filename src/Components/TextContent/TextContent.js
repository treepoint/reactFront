import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import TextareaAutosize from "react-autosize-textarea";
import ContextMenu from "./ContextMenu/ContextMenu";
import Blur from "../Blur/Blur";
import "./TextContent.css";

class TextContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contextMenuIsHidden: true,
      wideEditAreaIsHidden: true,
      value: "",
      isReadOnly: false,
      isChrome: this.isChrome()
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate() {
    if (this.state.isReadOnly) {
      return null;
    }

    if (this.state.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  isChrome() {
    if (navigator.userAgent.indexOf("Chrome") + 1) {
      return true;
    }

    return false;
  }

  onFocus() {
    this.setState({ isReadOnly: true });
  }

  //Изменяем контент по вводу
  onChange(event) {
    let value = event.target.value;

    if (this.props.isSingleLineMode) {
      value = value.replace(/\n/g, "");
    }

    this.setState({ value });
  }

  onKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();

      this.props.onChangeValue(this.state.value);
      this.setWideEditAreaHidden();
      this.setState({ isReadOnly: false });
    }
  }

  onBlur() {
    if (this.state.value !== this.props.value) {
      this.props.onChangeValue(this.state.value);
    }

    this.setWideEditAreaHidden();
    this.setState({ isReadOnly: false });
  }

  //Обрабатываем изменения стиля контента в ячейке в
  //зависимости от того, что было задано в контекстном меню
  onChangeStyle(style) {
    this.props.onChangeStyle(style);
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
    return {
      fontWeight: "900",
      width: this.props.width - (!!this.state.isChrome ? 9 : 8) + "px",
      minWidth: this.props.width - (!!this.state.isChrome ? 9 : 8) + "px",
      minHeight: this.props.height - 4 + "px",
      color: "#000"
    };
  }

  //Получаем стиль обычной ячейки на основании стиля контента
  getRegularStyle() {
    if (this.state.isChrome) {
      return {
        marginLeft: !!this.state.wideEditAreaIsHidden
          ? 0 + "px"
          : -(!!this.props.isFixed ? 0 : this.props.scrollLeft) + "px",
        marginTop: !!this.state.wideEditAreaIsHidden
          ? 0 + "px"
          : -(!!this.props.isFixed ? 0 : this.props.scrollTop) + "px",
        backgroundColor: !!this.props.disabled
          ? "rgb(251, 251, 251)"
          : "#ffffff",
        borderLeft: "8px solid " + this.props.backgroundColor,
        fontWeight: !!this.props.bold ? "900" : "200",
        fontStyle: !!this.props.italic ? "italic" : "normal",
        color: !!this.props.disabled ? "#444" : "#000",
        width: this.props.width - !!this.props.isStylable ? 9 : 17 + "px",
        minWidth: this.props.width - 17 + "px",
        minHeight: this.props.height - 4 + "px"
      };
    } else {
      return {
        //Подгоняем размеры внутреннего контента по размеры ячейки, но компенсируем отступы и бордюры
        marginLeft: !!this.state.wideEditAreaIsHidden
          ? 0 + "px"
          : -(!!this.props.isFixed ? 0 : this.props.scrollLeft) + "px",
        marginTop: !!this.state.wideEditAreaIsHidden
          ? 0 + "px"
          : -(!!this.props.isFixed ? 0 : this.props.scrollTop) + "px",
        backgroundColor: !!this.props.disabled
          ? "rgb(251, 251, 251)"
          : "#ffffff",
        borderLeft: "8px solid " + this.props.backgroundColor,
        fontWeight: !!this.props.bold ? "900" : "200",
        fontStyle: !!this.props.italic ? "italic" : "normal",
        color: !!this.props.disabled ? "#444" : "#000",
        width: this.props.width - !!this.props.isStylable ? 9 : 17 + "px",
        minWidth: this.props.width - 16 + "px",
        minHeight: this.props.height + "px"
      };
    }
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
    if (!this.state.wideEditAreaIsHidden) {
      return "textContent chosen";
    }

    return "textContent";
  }

  //Получаем контент ячейки в зависимости от того шапка таблицы это или обычная ячейка
  getCellContent() {
    return (
      <TextareaAutosize
        spellCheck="false"
        className={this.getClassName()}
        style={
          !!this.props.isHeader ? this.getHeaderStyle() : this.getRegularStyle()
        }
        //Задаем контент
        value={this.state.value}
        onFocus={event => this.onFocus(event)}
        disabled={!!this.props.disabled ? true : false}
        onChange={event => this.onChange(event)}
        //Обрабатываем двойной клик
        onDoubleClick={() => this.showWideEditArea()}
        //Обрабатываем контекстное меню
        onContextMenu={event => this.showContextMenu(event)}
        //Обрабатываем потерю фокуса
        onBlur={() => this.onBlur()}
        maxRows={1}
        onKeyPress={event => this.onKeyPress(event)}
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
          setContextMenuHidden={event => this.setContextMenuHidden(event)}
          onChangeStyle={style => this.onChangeStyle(style)}
          onWheel={event => this.setContextMenuHidden(event)}
        />
      );
    }
  }

  //Получим блюр для зоны редактирования
  getBlur() {
    if (!this.state.wideEditAreaIsHidden) {
      return (
        <Blur
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
        {this.getBlur()}
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
