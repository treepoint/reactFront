import React from "react";
import TextContent from "../../TextContent/TextContent";
import SelectContent from "../../SelectContent/SelectContent";
import TimeContent from "../../TimeContent/TimeContent";
import "./Cell.css";

class Cell extends React.PureComponent {
  //Обрабатываем изменения стиля контента в ячейке
  onChangeStyle(style) {
    this.props.onChangeStyle({ style });
  }

  //Обрабатываем изменения контента в ячейке
  onChangeValue(content) {
    this.props.onChangeValue(content);
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
            textAlign={this.props.textAlign}
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
            textAlign={this.props.textAlign}
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
      <div
        className={!!this.props.isHeader ? "th" : "td"}
        //Выставляем размеры ячейки
        style={{
          width: this.props.width + "px",
          height: this.props.height + 2 + "px"
        }}
      >
        {this.getCellContent()}
      </div>
    );
  }
}

export default Cell;
