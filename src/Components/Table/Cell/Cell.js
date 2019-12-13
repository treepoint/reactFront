import React from "react";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import CellContent from "./CellContent/CellContent";
import "./Cell.css";

class Cell extends React.Component {
  constructor() {
    super();
    this.state = {
      htmlContent: " ",
      uuid: "",
      //Стиль по умолчанию
      style: { bold: false, italic: false, backgroundColor: "#ffffff" }
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
  setHtmlContent(htmlContent) {
    this.setState({ htmlContent });
  }

  setDimensions() {
    //Если из вне пришли значения ширины и высоты и они отличаются от текущих — засетим
    if (this.state.height !== this.props.height) {
      this.setState({ height: this.props.height });
    }

    if (this.state.width !== this.props.width) {
      this.setState({ width: this.props.width });
    }
  }

  render() {
    this.setDimensions();

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
        enable={this.setEnabled()}
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
        {/*Добавляем сам контент в ячейке*/}
        <CellContent
          htmlContent={this.state.htmlContent}
          disabled={!this.props.isEditable}
          width={this.state.width}
          height={this.state.height}
          isTh={this.props.isTh}
          style={this.state.style}
          setStyle={style => {
            this.setStyle(style);
          }}
          setHtmlContent={htmlContent => this.setHtmlContent(htmlContent)}
        />
      </Resizable>
    );
  }
}

export default Cell;
