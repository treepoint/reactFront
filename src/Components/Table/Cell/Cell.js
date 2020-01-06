import React from "react";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import TextContent from "./TextContent/TextContent";
import SelectContent from "./SelectContent/SelectContent";
import TimeContent from "./TimeContent/TimeContent";
import "./Cell.css";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      uuid: "",
      //Текущий контент ячейки
      currentContent: " ",
      //Пришедший из вне контент ячейки
      initContent: " ",
      //Тип контента
      type: "",
      //Стиль по умолчанию
      style: { bold: false, italic: false, backgroundColor: "#ffffff" },
      disabled: true
    };
  }

  componentDidMount() {
    //Генерируем UUID для ячейки
    this.setState({ uuid: uuid() });

    //Задаем тип контента, пока только при инициализации
    this.updateTypeContent();

    //Задаем редактируемость контента, пока только при инициализации
    this.updateContentDisabled();

    this.updateContent();
  }

  componentDidUpdate() {
    this.updateContent();
  }

  //Задаем тип контента
  updateTypeContent() {
    if (typeof this.props.content.type !== "undefined") {
      this.setState({ type: this.props.content.type });
    }
  }

  //Задаем редактируемость контента
  updateContentDisabled() {
    if (typeof this.props.content.disabled !== "undefined") {
      this.setState({ disabled: this.props.content.disabled });
    }
  }

  //Обновляем контент в ячейке
  updateContent() {
    if (typeof this.props.content !== "undefined") {
      let initContent = this.props.content.value;

      //Если тип поля — текст, то на всякий случай конвертим в текст
      if (
        this.props.content.type === "text" ||
        this.props.content.type === "string"
      ) {
        initContent = String(initContent);
      }

      if (initContent !== this.state.initContent) {
        //Задаем сам контент
        this.setState({ initContent });
        this.setState({ currentContent: initContent });
      }
    }
  }

  //Задаем возможность изменяться
  setEnabled() {
    if (this.props.isResizeble) {
      return {
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
      return {
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
  }

  //Обрабатываем изменения стиля контента в ячейке
  setStyle(style) {
    this.setState({ style });
  }

  //Обрабатываем изменения контента в ячейке
  onChange(content) {
    this.props.onChange(content);
  }

  //Обрабатываем изменение размеров
  changeDimensions(width, height) {
    if (!this.props.isResizeble) {
      return;
    }

    ///Отправляем uuid ячейки, которая меняет всех
    if (this.props.uuid === "") {
      this.props.changeUUID(this.state.uuid);
    }

    //Если сейчас изменяется не эта ячейка — размеры никуда не прокидываем
    if (this.props.uuid !== this.state.uuid) {
      return;
    }

    //Если что-то поменялось и это не высота, значит длина
    if (height !== 0) {
      this.props.changeHeight(height);
    } else {
      this.props.changeWidth(width);
    }
  }

  getCellContent() {
    switch (this.state.type) {
      //Время в формате 00:00
      case "time":
        return (
          <TimeContent
            content={this.state.currentContent}
            isHeader={this.props.isHeader}
            disabled={this.state.disabled}
            width={this.props.width}
            height={this.props.height}
            onChange={content => this.onChange(content)}
          />
        );
      //Строки
      case "string":
        return (
          <TextContent
            content={this.state.currentContent}
            isHeader={this.props.isHeader}
            disabled={this.state.disabled}
            width={this.props.width}
            height={this.props.height}
            isStylable={this.props.isStylable}
            isSingleLineMode={true}
            style={this.state.style}
            setStyle={style => {
              this.setStyle(style);
            }}
            onChange={content => this.onChange(content)}
          />
        );
      //Многострочный текст
      case "text":
        return (
          <TextContent
            content={this.state.currentContent}
            isHeader={this.props.isHeader}
            disabled={this.state.disabled}
            width={this.props.width}
            height={this.props.height}
            isStylable={this.props.isStylable}
            style={this.state.style}
            setStyle={style => {
              this.setStyle(style);
            }}
            onChange={content => this.onChange(content)}
          />
        );
      //Выпадающий список
      case "select":
        return (
          <SelectContent
            content={this.state.currentContent}
            disabled={this.state.disabled}
            width={this.props.width}
            height={this.props.height}
            onChange={content => this.onChange(content)}
          />
        );

      default:
        return;
    }
  }

  render() {
    //Если тип контента — скрытый, вообще ничего не рисуем
    if (this.state.type === "hidden") {
      return null;
    }

    return (
      <Resizable
        className={!!this.props.isHeader ? "th" : "td"}
        //Выставляем размеры ячейки
        size={{
          width: this.props.width + "px",
          height: this.props.height + "px"
        }}
        //Задаем минимальную высоту
        minHeight={34}
        minWidth={20}
        //Указываем какие грани ячейки активны для изменения размеров
        enable={this.setEnabled()}
        //При резайзе отправляем размеры вверх, в строку
        onResize={(e, direction, ref, d) => {
          this.changeDimensions(d.width, d.height);
        }}
        //Если закончили ресайз — прокинем событие выше. Столбец на
        //основании этого при следующем резайзе будет считать размеры заново
        onResizeStop={() => {
          this.props.stopChangeDimensions();
        }}
      >
        {this.getCellContent()}
      </Resizable>
    );
  }
}

export default Cell;
