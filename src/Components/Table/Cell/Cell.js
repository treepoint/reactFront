import React from "react";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import TextContent from "./TextContent/TextContent";
import SelectContent from "./SelectContent/SelectContent";
import StringContent from "./StringContent/StringContent";
import TimeContent from "./TimeContent/TimeContent";
import "./Cell.css";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      //HTML контент ячейки
      htmlContent: " ",
      initHtmlContent: " ",
      typeContent: "",
      disabled: true,
      uuid: "",
      //Стиль по умолчанию
      style: { bold: false, italic: false, backgroundColor: "#ffffff" }
    };
  }

  componentDidMount() {
    this.updateContent();

    //Генерируем UUID для ячейки
    this.setState({ uuid: uuid() });
  }

  componentDidUpdate() {
    this.updateContent();
  }

  //Обновляем контент в ячейке
  updateContent() {
    if (typeof this.props.initHtmlContent !== "undefined") {
      let initHtmlContent;

      //Если тип поля — текст, то на всякий случай конвертим в текст
      if (
        this.state.typeContent === "text" ||
        this.state.typeContent === "string"
      ) {
        initHtmlContent = String(this.props.initHtmlContent.value);
      } else {
        initHtmlContent = this.props.initHtmlContent.value;
      }

      if (initHtmlContent !== this.state.initHtmlContent) {
        //Задаем сам контент
        this.setState({ initHtmlContent });
        this.setState({ htmlContent: initHtmlContent });
        //Задаем тип контента
        this.setState({ typeContent: this.props.initHtmlContent.type });
        //Задаем редактируемость контента
        if (typeof this.props.initHtmlContent.disabled !== "undefined") {
          this.setState({ disabled: this.props.initHtmlContent.disabled });
        }
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
    // this.setState({ htmlContent });
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
    //Если тип контента просто текст — отображаем просто текст

    switch (this.state.typeContent) {
      case "time":
        return (
          <TimeContent
            content={this.state.htmlContent}
            isHeader={this.props.isHeader}
            disabled={this.state.disabled}
            width={this.props.width}
            height={this.props.height}
            onChange={content => this.onChange(content)}
          />
        );
      case "string":
        return (
          <StringContent
            content={this.state.htmlContent}
            isHeader={this.props.isHeader}
            disabled={this.state.disabled}
            width={this.props.width}
            height={this.props.height}
            onChange={content => this.onChange(content)}
          />
        );
      case "text":
        return (
          <TextContent
            content={this.state.htmlContent}
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
      //Если выпадающий список — используем выпадающие списки
      case "select":
        return (
          <SelectContent
            content={this.state.htmlContent}
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
