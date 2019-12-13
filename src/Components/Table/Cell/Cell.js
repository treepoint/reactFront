import React from "react";
import ContentEditable from "react-contenteditable";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import ContextMenu from "../ContextMenu/ContextMenu";
import "./Cell.css";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      htmlContent: " ",
      innerClassName: "inner",
      contextMenuIsHidden: true,
      uuid: ""
    };
  }

  componentDidMount() {
    //Добавляем в ячейку контент, если он есть
    if (typeof this.props.htmlContent !== "undefined") {
      //Чтобы нам не прилетело — мы здесь со строками работаем
      this.setState({ htmlContent: String(this.props.htmlContent) });
    }

    //Генерируем UUID для ячейки
    this.setState({ uuid: uuid() });
  }

  //Изменяем контент по вводу
  onChange(event) {
    this.setState({ htmlContent: event.target.value });
  }

  //Срабатывает при двойном клике
  setChosenClassName() {
    if (!this.props.isEditable) {
      return;
    }

    this.setState({ innerClassName: "inner chosen" });
  }

  //Срабатывает при вызове контекстного меню
  showContextMenu(event) {
    if (this.props.isEditable) {
      event.preventDefault();
      this.setState({ contextMenuIsHidden: false });
    }
  }

  //Срабатывает при потере фокуса
  setDefaultClassNameForInner() {
    this.setState({
      innerClassName: "inner"
    });
  }

  //Срабатывает при потере фокуса
  setContextMenuHidden() {
    this.setState({
      contextMenuIsHidden: true
    });
  }

  render() {
    //Если из вне пришли значения ширины и высоты и они отличаются от текущих — засетим
    if (this.state.height !== this.props.height) {
      this.setState({ height: this.props.height });
    }

    if (this.state.width !== this.props.width) {
      this.setState({ width: this.props.width });
    }

    let enable;

    if (this.props.isResizeble) {
      enable = {
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      };
    } else {
      enable = {
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      };
    }

    return (
      <Resizable
        className={!!this.props.isTh ? "th" : "td"}
        uuid={this.state.uuid}
        //Выставляем размеры ячейки
        size={{
          width: this.state.width + "px",
          height: this.state.height + "px"
        }}
        //Задаем минимальную высоту
        minHeight={34}
        //Указываем какие грани ячейки активны для изменения размеров
        enable={enable}
        //При резайзе отправляем размеры вверх, в строку
        onResize={(e, direction, ref, d) => {
          this.props.changeDimensions(d.width, d.height);
        }}
        //Если закончили ресайз — прокинем событие выше. Столбец на
        //основании этого при следующем резайзе будет считать размеры заново
        onResizeStop={() => {
          this.props.stopChangeDimensions();
        }}
      >
        <ContextMenu
          className={this.state.contextMenuClassName}
          setContextMenuHidden={() => this.setContextMenuHidden()}
          contextMenuIsHidden={this.state.contextMenuIsHidden}
        />
        {/*Отображаем само поле с редактируемым контентом */}
        <ContentEditable
          spellcheck="false"
          className={this.state.innerClassName}
          style={{
            //Подгоняем размеры внутреннего контента по размеры ячейки, но компенсируем отступы и бордюры
            width: this.state.width - 5 + "px",
            height: this.state.height - 12 + "px"
          }}
          //Задаем контент
          html={this.state.htmlContent}
          //Задаем редактируемость. Не редактируем === отключено
          disabled={!this.props.isEditable}
          onChange={event => this.onChange(event)}
          //Обрабатываем двойной клик
          onDoubleClick={event => this.setChosenClassName(event)}
          //При уходе фокуса задаем стандартный стиль. Нужно чтобы сбросить последствия двойного клика
          onBlur={event => this.setDefaultClassNameForInner(event)}
          //Обрабатываем контекстное меню
          onContextMenu={event => this.showContextMenu(event)}
        ></ContentEditable>
      </Resizable>
    );
  }
}

export default Cell;
