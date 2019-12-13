import React from "react";
import RegularCell from "../RegularCell/RegularCell";
import HeaderCell from "../HeaderCell/HeaderCell";
import "./Row.css";

class Row extends React.Component {
  constructor() {
    super();
    this.state = {
      //Текущая высота строки. Если задано — считается значением по-умолчанию
      height: 34,
      //Прошлая ширина и высота. Нужны для вычисления смещения между текущей шириной\высотой и прошлой
      prevHeight: 0
    };
  }

  changeHeight(height) {
    //Высоту изменяем на уровне строки
    this.setState({
      height: this.state.height + height - this.state.prevHeight,
      prevHeight: height
    });
  }

  changeUUID(uuid) {
    this.props.changeUUID(uuid);
  }

  changeWidth(width, column) {
    //А вот длину пробрасываем выше, чтобы обработать на
    //уровне таблицы и поменять размеры ячеек во всех строках
    this.props.changeColumnWidth(width, column);
  }

  //По остановке изменения размеров — сбрасываем прошлые значения
  stopChangeDimensions() {
    this.setState(
      {
        prevHeight: 0
      },
      this.props.stopChangeDimensions()
    );
  }

  render() {
    //Из пришедшего описания столбцов соберем ячейки
    let cells = this.props.columnsDescription.map((column, index) => {
      if (!this.props.isHeader) {
        return (
          <RegularCell
            isEditable={this.props.isEditable}
            isResizeble={this.props.isResizeble}
            uuid={this.props.uuid}
            width={column.width}
            height={this.state.height}
            htmlContent={this.props.rowsContent[index]}
            changeUUID={uuid => this.changeUUID(uuid)}
            changeWidth={width => this.changeWidth(width, index)}
            changeHeight={height => this.changeHeight(height)}
            stopChangeDimensions={() => this.stopChangeDimensions()}
          />
        );
      } else
        return (
          <HeaderCell
            isEditable={this.props.isEditable}
            isResizeble={this.props.isResizeble}
            uuid={this.props.uuid}
            width={column.width}
            height={this.state.height}
            htmlContent={this.props.rowsContent[index]}
            changeUUID={uuid => this.changeUUID(uuid)}
            changeWidth={width => this.changeWidth(width, index)}
            changeHeight={height => this.changeHeight(height)}
            stopChangeDimensions={() => this.stopChangeDimensions()}
          />
        );
    });

    return <div className="row">{cells}</div>;
  }
}

export default Row;
