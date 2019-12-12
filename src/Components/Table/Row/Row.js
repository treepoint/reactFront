import React from "react";
import Cell from "../Cell/Cell";
import "./Row.css";

class Row extends React.Component {
  constructor() {
    super();
    this.state = {
      //Текущая ширина и высота строки. Если задано — считается значением по-умолчанию
      width: 0,
      height: 24,
      //Прошлая ширина и высота. Нужны для вычисления смещения между текущей шириной\высотой и прошлой
      prevWidth: 0,
      prevHeight: 0
    };
  }

  //Обрабатываем изменение размеров ячейки
  changeDimensions(width, height, column) {
    //Высоту изменяем на уровне строки
    this.setState({
      height: this.state.height + height - this.state.prevHeight,
      prevHeight: height
    });

    //А вот длину пробрасываем выше, чтобы обработать на уровне таблицы и поменять размеры ячеек во всех строках
    this.props.changeColumnWidth(
      this.state.width + width - this.state.prevWidth,
      column
    );
  }

  //По остановке изменения размеров — сбрасываем прошлые значения
  stopChangeDimensions() {
    this.setState(
      {
        prevWidth: 0,
        prevHeight: 0
      },
      this.props.stopChangeDimensions()
    );
  }

  render() {
    //Из пришедшего описания столбцов соберем ячейки
    let cells = this.props.columnsDescription.map((column, index) => {
      return (
        <Cell
          isEditable={this.props.isEditable}
          isResizeble={this.props.isResizeble}
          isTh={this.props.isHeader}
          height={this.state.height}
          width={column.width}
          htmlContent={this.props.rowsContent[index]}
          changeDimensions={(width, height) =>
            this.changeDimensions(width, height, index)
          }
          stopChangeDimensions={() => this.stopChangeDimensions()}
        />
      );
    });

    return (
      <div
        className={"row"}
        size={{
          width: this.state.width + "px",
          height: this.state.height + "px"
        }}
      >
        {cells}
      </div>
    );
  }
}

export default Row;
