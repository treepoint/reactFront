import React from "react";
import uuid from "uuid/v4";
import { Resizable } from "re-resizable";
import TextContent from "../../TextContent/TextContent";
import SelectContent from "../../SelectContent/SelectContent";
import TimeContent from "../../TimeContent/TimeContent";
import "./Cell.css";

class Cell extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      uuid: uuid()
    };
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
  onChangeStyle(style) {
    this.props.onChangeStyle({ style });
  }

  //Обрабатываем изменения контента в ячейке
  onChangeValue(content) {
    this.props.onChangeValue(content);
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
    switch (this.props.type) {
      //Время в формате 00:00
      case "time":
        return (
          <TimeContent
            value={this.props.value}
            isHeader={this.props.isHeader}
            disabled={this.props.disabled}
            width={this.props.width}
            height={this.props.height}
            onChangeValue={value => this.onChangeValue(value)}
          />
        );
      //Строки
      case "string":
        return (
          <TextContent
            isFixed={this.props.isFixed}
            value={String(this.props.value)}
            isHeader={this.props.isHeader}
            disabled={this.props.disabled}
            width={this.props.width}
            height={this.props.height}
            isStylable={this.props.isStylable}
            isSingleLineMode={true}
            //Настройки стиля
            bold={this.props.style.bold}
            italic={this.props.style.italic}
            backgroundColor={this.props.style.backgroundColor}
            //Функции
            onChangeStyle={style => {
              this.onChangeStyle(style);
            }}
            onChangeValue={value => this.onChangeValue(value)}
          />
        );
      //Многострочный текст
      case "text":
        return (
          <TextContent
            isFixed={this.props.isFixed}
            value={String(this.props.value)}
            isHeader={this.props.isHeader}
            disabled={this.props.disabled}
            width={this.props.width}
            height={this.props.height}
            isStylable={this.props.isStylable}
            //Настройки стиля
            bold={this.props.style.bold}
            italic={this.props.style.italic}
            backgroundColor={this.props.style.backgroundColor}
            //Функции
            onChangeStyle={style => {
              this.onChangeStyle(style);
            }}
            onChangeValue={value => this.onChangeValue(value)}
          />
        );
      //Выпадающий список
      case "select":
        return (
          <SelectContent
            value={this.props.value}
            disabled={this.props.disabled}
            width={this.props.width}
            height={this.props.height}
            onChangeValue={value => this.onChangeValue(value)}
          />
        );

      default:
        return;
    }
  }

  render() {
    //Если тип контента — скрытый, вообще ничего не рисуем
    if (this.props.type === "hidden") {
      return null;
    }

    return (
      <Resizable
        className={!!this.props.isHeader ? "th" : "td"}
        //Выставляем размеры ячейки
        size={{
          width: this.props.width + "px",
          height: this.props.height + 1 + "px"
        }}
        //Задаем минимальную высоту
        minHeight={35}
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
