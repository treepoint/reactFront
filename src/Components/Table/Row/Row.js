import React from "react";
//Подключаем redux
import { connect } from "react-redux";
//Компоненты
import Cell from "../Cell/Cell";
import Action from "../../Action/Action";
//Иконки
import deleteIcon from "../../../Images/icon_delete.png";
import archiveIcon from "../../../Images/icon_archive.png";
import incompleteIcon from "../../../Images/icon_incomplete.png";
import addIcon from "../../../Images/icon_add.png";
//CSS
import "./Row.css";

class Row extends React.PureComponent {
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

  //Получим кнопки с действием для этой строки
  getActionButton() {
    let buttons = null;

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

      if (this.props.dearchiveRow !== null) {
        buttons = (
          <Action
            icon={incompleteIcon}
            disabled={false}
            hint="Разархивировать"
            onClick={() => this.props.dearchiveRow(this.props.rowsContent)}
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

  getCells() {
    //Из пришедшего описания столбцов соберем ячейки
    let cells = this.props.colsDescription.map((column, index) => {
      let width = column.width;

      //В общем, некоторые поля могут быть скрываемыми, например, если не влазят в размеры экрана
      if (this.props.tableWidth + 74 > this.props.windowWidth) {
        if (!!column.minWidth) {
          width =
            column.width -
            (this.props.tableWidth +
              84 -
              this.props.windowWidth -
              this.props.hidableWidth);

          //Но если размер стал меньше, чем допустимый — возьмем минимальный
          if (width < column.minWidth) {
            width = column.minWidth;
          }
        }

        if (this.props.rowsContent[index].hidable) {
          return null;
        }
      }

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
          isHeader={this.props.isHeader}
          //Размеры
          width={width}
          height={34}
          //Контент ячейки и его свойства
          type={this.props.rowsContent[index].type}
          style={style}
          isStylable={isStylable}
          value={this.props.rowsContent[index].value}
          disabled={this.props.rowsContent[index].disabled}
          //Функции на обработку
          onChangeValue={(content) => this.onChangeValue(content, index)}
          onChangeStyle={(style) => this.onChangeStyle(style, index)}
        />
      );
    });

    return cells;
  }

  render() {
    return (
      <div className={"row" + (!!this.props.isHeader ? " header" : "")}>
        {this.getCells()} {this.getActionButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    windowWidth: state.windowWidth,
  };
};

export default connect(mapStateToProps)(Row);
