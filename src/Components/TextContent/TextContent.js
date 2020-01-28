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
    if (!this.state.isReadOnly && this.state.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  isChrome() {
    return navigator.userAgent.indexOf("Chrome") + 1;
  }

  //Изменяем контент по вводу
  onChange(event) {
    let value = event.target.value;

    //Если в режиме одной строки — просто удалим переносы при вводе если они были
    if (this.props.isSingleLineMode) {
      value = value.replace(/\n/g, "");
    }

    this.setState({ value });
  }

  onKeyPress(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();

      this.onEndEditing();
    }
  }

  onEndEditing() {
    if (this.state.value !== this.props.value) {
      this.props.onChangeValue(this.state.value);
    }

    this.setWideEditAreaHidden();
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

  //Получаем стиль ячейки заголовка на основании стиля контента
  getStyle() {
    if (this.props.isHeader) {
      return {
        fontWeight: "900",
        width: this.props.width - (!!this.state.isChrome ? 9 : 8) + "px",
        minWidth: this.props.width - (!!this.state.isChrome ? 9 : 8) + "px",
        minHeight: this.props.height - 4 + "px",
        color: "#000"
      };
    } else {
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
        width: this.props.width - (!!this.props.isStylable ? 17 : 8) + "px",
        minWidth: this.props.width - (!!this.state.isChrome ? 17 : 16) + "px",
        minHeight: this.props.height - (!!this.state.isChrome ? 4 : 0) + "px"
      };
    }
  }

  //Получаем контент ячейки в зависимости от того шапка таблицы это или обычная ячейка
  getCellContent() {
    return (
      <TextareaAutosize
        spellCheck="false"
        className={this.getClassName()}
        style={this.getStyle()}
        //Задаем контент
        value={this.state.value}
        onFocus={() => this.setState({ isReadOnly: true })}
        disabled={!!this.props.disabled ? true : false}
        onChange={event => this.onChange(event)}
        //Обрабатываем двойной клик
        onDoubleClick={() => this.showWideEditArea()}
        //Обрабатываем контекстное меню
        onContextMenu={event => this.showContextMenu(event)}
        //Обрабатываем потерю фокуса
        onBlur={() => this.onEndEditing()}
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
          onChangeStyle={style => this.props.onChangeStyle(style)}
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
