import React from "react";
import Cell from "../Cell/Cell";
import DeleteButton from "./DeleteButton/DeleteButton";
import AddButton from "./AddButton/AddButton";
import "./Row.css";

class Row extends React.PureComponent {
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

  //Обрабатываем изменение контента
  onChangeValue(content, index) {
    //Получим текущий массив, содержащий значения всех ячеек
    let rowContent = JSON.parse(JSON.stringify(this.props.rowsContent));

    //Обновим в нем нужное значение
    rowContent[index].value = content;

    //Передадим выше, для сохранения
    this.props.saveRow(rowContent);
  }

  //Обрабатываем изменения стиля контента в ячейке
  onChangeStyle(style, index) {
    //Получим текущий массив, содержащий значения всех ячеек
    let rowContent = JSON.parse(JSON.stringify(this.props.rowsContent));

    //Обновим в нем нужное значение
    rowContent[index] = Object.assign(rowContent[index], style);

    //Передадим выше, для сохранения
    this.props.saveRow(rowContent);
  }

  deleteRow() {
    this.props.deleteRow(this.props.rowsContent);
  }

  getActionButton() {
    if (!this.props.isEditable) {
      return null;
    }

    if (this.props.isHeader) {
      if (this.props.addRow === null) {
        return <AddButton disabled={true} />;
      } else {
        return (
          <AddButton disabled={false} addRow={() => this.props.addRow()} />
        );
      }
    } else {
      if (this.props.deleteRow === null) {
        return <DeleteButton disabled={true} />;
      } else {
        return (
          <DeleteButton disabled={false} deleteRow={() => this.deleteRow()} />
        );
      }
    }
  }

  render() {
    //Из пришедшего описания столбцов соберем ячейки
    let cells = this.props.colsDescription.map((column, index) => {
      //Проверяем стиль, поскольку его может и не быть вовсе
      let style;

      let isStylable;
      if (typeof this.props.rowsContent[index].style !== "undefined") {
        style = this.props.rowsContent[index].style;
        isStylable = true;
      } else {
        style = {};
        isStylable = false;
      }

      return (
        <Cell
          key={index}
          //Настройки ячейки
          isFixed={this.props.isFixed}
          isResizeble={this.props.isResizeble}
          isHeader={this.props.isHeader}
          //UUID
          uuid={this.props.uuid}
          //Размеры
          width={column.width}
          height={this.state.height}
          //Контент ячейки и его свойства
          type={this.props.rowsContent[index].type}
          style={style}
          isStylable={isStylable}
          value={this.props.rowsContent[index].value}
          disabled={this.props.rowsContent[index].disabled}
          //Функции на обработку
          changeUUID={uuid => this.changeUUID(uuid)}
          changeWidth={width => this.changeWidth(width, index)}
          changeHeight={height => this.changeHeight(height)}
          stopChangeDimensions={() => this.stopChangeDimensions()}
          onChangeValue={content => this.onChangeValue(content, index)}
          onChangeStyle={style => this.onChangeStyle(style, index)}
        />
      );
    });

    return (
      <div className="row">
        {cells} {this.getActionButton()}
      </div>
    );
  }
}

export default Row;
