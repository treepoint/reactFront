import React from "react";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import CellContent from "./HeaderCellContent/HeaderCellContent";
import "./HeaderCell.css";

class HeaderCell extends React.Component {
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
      /*Отправляем uuid ячейки, которая меняет всех. Если сейчас
       *изменяется не эта ячейка — размеры никуда не прокидываем
       */
      this.props.changeWidth(width);
    }
  }

  render() {
    return (
      <Resizable
        className="th"
        //Выставляем размеры ячейки
        size={{
          width: this.props.width + "px",
          height: this.props.height + "px"
        }}
        //Задаем минимальную высоту
        minHeight={34}
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
        {/*Добавляем сам контент в ячейке*/}
        <CellContent
          htmlContent={this.state.htmlContent}
          disabled={!this.props.isEditable}
          width={this.props.width}
          height={this.props.height}
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

export default HeaderCell;
