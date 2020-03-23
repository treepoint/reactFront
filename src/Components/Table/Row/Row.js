import React from "react";
import Cell from "../Cell/Cell";
import Action from "../../Action/Action";
import deleteIcon from "../../../Images/icon_delete.png";
import archiveIcon from "../../../Images/icon_archive.png";
import addIcon from "../../../Images/icon_add.png";
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

  getActionButton() {
    let buttons = null;

    if (!this.props.isEditable) {
      return buttons;
    }

    if (this.props.isHeader) {
      if (this.props.addRow === null) {
        buttons = <Action disabled={true} icon={addIcon} />;
      } else {
        buttons = (
          <Action
            icon={addIcon}
            disabled={false}
            hint="Добавить"
            onClick={() => this.props.addRow()}
          />
        );
      }
    } else {
      if (this.props.archiveRow !== null) {
        buttons = (
          <Action
            icon={archiveIcon}
            disabled={false}
            hint="Архивировать"
            onClick={() => this.props.archiveRow(this.props.rowsContent)}
          />
        );
      }

      if (this.props.deleteRow !== null) {
        buttons = (
          <Action
            icon={deleteIcon}
            disabled={false}
            hint="Удалить"
            onClick={() => this.props.deleteRow(this.props.rowsContent)}
          />
        );
      }
    }

    return <div className="rowButton">{buttons}</div>;
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
      <div className={"row" + (!!this.props.isHeader ? " header" : "")}>
        {cells} {this.getActionButton()}
      </div>
    );
  }
}

export default Row;
