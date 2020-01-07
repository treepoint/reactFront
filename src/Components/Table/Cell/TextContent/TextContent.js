import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Подключаем компоненты
import TextareaAutosize from "react-autosize-textarea";
import ContextMenu from "./ContextMenu/ContextMenu";
import WideEditAreaBlur from "./WideEditAreaBlur/WideEditAreaBlur";
import "./TextContent.css";

class TextContent extends React.Component {
  constructor() {
    super();
    this.state = {
      contextMenuIsHidden: true,
      wideEditAreaIsHidden: true,
      isReadOnly: true,
      value: ""
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.value });
  }

  componentDidUpdate() {
    if (this.state.value !== this.props.value && this.state.isReadOnly) {
      this.setState({ value: this.props.value });
    }
  }

  //Изменяем контент по вводу
  onChange(event) {
    let value = event.target.value;

    if (this.props.isSingleLineMode) {
      value = value.replace(/\n/g, "");
    }

    this.setState({ value });
  }

  onBlur() {
    if (!this.state.isReadOnly) {
      if (this.state.value !== this.props.value) {
        this.props.onChangeValue(this.state.value);
      }
    }

    this.setWideEditAreaHidden();
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
      wideEditAreaIsHidden: true,
      isReadOnly: true
    });
  }

  //Получаем стиль ячейки заголовка на основании стиля контента
  getHeaderStyle() {
    let style;

    style = {
      fontWeight: "900",
      width: this.props.width - 8 + "px",
      height: this.props.height - 13 + "px",
      minWidth: this.props.width - 8 + "px",
      minHeight: this.props.height - 13 + "px",
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
      width: this.props.width - 8 + "px",
      height: this.props.height - 12 + "px",
      background: !!this.props.disabled
        ? "rgb(251, 251, 251)"
        : this.props.style.backgroundColor,
      fontWeight: !!this.props.style.bold ? "900" : "200",
      fontStyle: !!this.props.style.italic ? "italic" : "normal",
      color: !!this.props.disabled ? "#444" : "#000",
      minWidth: this.props.width - 8 + "px",
      minHeight: this.props.height - 12 + "px"
    };
  }

  //Срабатывает при двойном клике
  showWideEditArea(event) {
    if (this.props.disabled || this.props.isHeader) {
      return;
    }

    this.setState({
      wideEditAreaIsHidden: false,
      contextMenuIsHidden: true,
      isReadOnly: false
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
      <TextareaAutosize
        spellCheck="false"
        className={this.getClassName()}
        style={
          !!this.props.isHeader ? this.getHeaderStyle() : this.getRegularStyle()
        }
        //Задаем контент
        value={this.state.value}
        disabled={!!this.props.disabled ? true : false}
        //Задаем редактируемость
        readOnly={this.state.isReadOnly}
        onChange={event => this.onChange(event)}
        //Обрабатываем двойной клик
        onDoubleClick={event => this.showWideEditArea(event)}
        //Обрабатываем контекстное меню
        onContextMenu={event => this.showContextMenu(event)}
        //Обрабатываем потерю фокуса
        onBlur={event => this.onBlur(event)}
        maxRows={1}
      />
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
          onChangeStyle={style => this.onChangeStyle(style)}
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
