import React from "react";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем компоненты
import SaveMark from "./SaveMark/SaveMark";
import Row from "./Row/Row";
//CSS
import "./Table.css";

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      colsDescription: [],
      tableHeader: [],
      tableBody: [],
      table: [],
      uuid: ""
    };
  }

  componentDidMount() {
    this.setTable();
  }

  componentDidUpdate() {
    this.setTable();

    //Если при обновлении задали без скроллов — проскролим до самого верха
    if (this.props.noScroll === true) {
      this._scrollBarRef.scrollToTop();
    }
  }

  setTable() {
    let table = this.props.children;

    //Если новая таблица отличается от того, что хранится в стейте — обновим её
    if (JSON.stringify(table) !== JSON.stringify(this.state.table)) {
      this.setColsWidth(table);

      this.setState({
        table
      });
    }
  }

  setColsWidth(table) {
    //Соберем массив, описывающий столбцы
    let colsDescription = table[0].map(column => {
      //Если есть описание — получим данные оттуда. Иначе — стандартные
      try {
        return {
          //Текущая, ну или начальная ширина
          width: column.width,
          //И прошлая ширина. По умолчанию всегда 0
          prevWidth: 0,
          type: column.type
        };
      } catch {
        return {
          width: 200,
          prevWidth: 0,
          type: column.type
        };
      }
    });

    //Запишем в стейт описание столбцов
    this.setState({
      colsDescription
    });
  }

  //Подсчет ширины таблицы
  getTableWidth() {
    let tableWidth = 0;

    this.state.colsDescription.forEach(column => {
      if (typeof column.width === "number" && column.type !== "hidden") {
        tableWidth += column.width;
      }
    });

    return tableWidth;
  }

  //Изменяем ширину столбцов
  changeColumnWidth(width, column) {
    //Если прилетело это событие, но ширина — ноль. Не отрабатываем. Это бессмысленно и скорее всего меняли высоту
    if (width === 0) {
      return;
    }

    //Скопируем текущий стейт
    let colsDescription = this.state.colsDescription;

    //Обновим состояние нужного столбца
    colsDescription[column] = {
      //Ширину перезапишем
      width:
        colsDescription[column].width +
        width -
        colsDescription[column].prevWidth,
      //Заменим прошлую ширину на текущую, которая после этого станет прошлой
      prevWidth: width
    };

    //Обновим состояние
    this.setState({
      colsDescription
    });
  }

  //Изменим UUID ячейки, которая изменяла свою ширину
  changeUUID(uuid) {
    this.setState({
      uuid
    });
  }

  //Сбрасываем предыдушие длины как только закончили изменение размеров
  stopChangeDimensions() {
    //Скопируем текущий стейт
    let colsDescription = this.state.colsDescription;

    //Сбросим все изменения размеров
    colsDescription = colsDescription.map(column => {
      return Object.assign(column, { prevWidth: 0 });
    });

    //Обновим стейт
    this.setState({ colsDescription, uuid: "" });
  }

  getObjectFromRowContent(rowContent) {
    //Разберем контент и вернем уже объект, с которым будем работать дальше
    let object = {};

    rowContent.forEach(item => {
      switch (item.type) {
        case "hidden":
          object[item.key] = item.value;
          break;
        case "time":
          object[item.key] = item.value;
          break;
        case "string":
          object[item.key] = item.value;
          if (typeof item.style !== "undefined") {
            object[item.key + "_style"] = item.style;
          }
          break;
        case "text":
          object[item.key] = item.value;
          if (typeof item.style !== "undefined") {
            object[item.key + "_style"] = item.style;
          }
          break;
        case "select":
          object[item.key] = item.value.current;
          break;
        default:
          return;
      }
    });

    return object;
  }

  saveRow(rowContent, index) {
    //Если не функция — ничего делать не будем. Значит её не передали
    if (typeof this.props.saveRow !== "function") {
      return;
    }

    //Соберем объект из строки
    let object = this.getObjectFromRowContent(rowContent);

    //Отправим на сохранение в ДБ
    this.props.saveRow(object);
  }

  deleteRow(rowContent) {
    let object = this.getObjectFromRowContent(rowContent);

    this.props.deleteRow(object);
  }

  getHeader() {
    //Если шапки нет — вернем ничего
    if (this.props.isHeaderless) {
      return null;
    }

    //Иначе вернем шапку
    return (
      <Row
        key={0}
        isFixed={this.props.isFixed}
        //Указываем, на наличие шапки. По умолчанию — есть
        isHeader={true}
        //Задаем возможность изменения размеров ячеек
        isResizeble={this.props.isResizeble}
        //Задаем возможность редактирования ячеек
        isEditable={this.props.isEditable}
        //Прокидывем UUID ячейки, которая сейчас изменяет свои размеры
        uuid={this.state.uuid}
        //Передадим содержимое столбцов из шапки
        rowsContent={this.state.table[0]}
        //Так же передадим описание столбцов — ширину и подобное
        colsDescription={this.state.colsDescription}
        //И callback'и на обработку изменения ширины столбца
        changeColumnWidth={(width, column) =>
          this.changeColumnWidth(width, column)
        }
        //и остановку изменения
        stopChangeDimensions={() => this.stopChangeDimensions()}
        //Изменим UUID ячейки, которая изменяла свою ширину
        changeUUID={uuid => this.changeUUID(uuid)}
      />
    );
  }

  getContent() {
    //Соберем тушку для отрисовки
    let content = this.state.table.map((row, index) => {
      //Если есть шапка — её рисуем в другом месте
      if (!this.props.isHeaderless && index === 0) {
        return null;
      }

      return (
        <Row
          key={index}
          isFixed={this.props.isFixed}
          //Указываем, на наличие шапки. По умолчанию — есть
          isHeader={false}
          //Задаем возможность изменения размеров ячеек
          isResizeble={this.props.isResizeble}
          //Задаем возможность редактирования ячеек
          isEditable={this.props.isEditable}
          //Прокидывем UUID ячейки, которая сейчас изменяет свои размеры
          uuid={this.state.uuid}
          //Передадим содержимое столбцов из шапки
          rowsContent={row}
          //Так же передадим описание столбцов — ширину и подобное
          colsDescription={this.state.colsDescription}
          //И callback'и на обработку изменения ширины столбца
          changeColumnWidth={(width, column) =>
            this.changeColumnWidth(width, column)
          }
          //и остановку изменения
          stopChangeDimensions={() => this.stopChangeDimensions()}
          //Изменим UUID ячейки, которая изменяла свою ширину
          changeUUID={uuid => this.changeUUID(uuid)}
          saveRow={rowContent => this.saveRow(rowContent, index)}
          addRow={!!this.props.addRow ? () => this.props.addRow() : null}
          deleteRow={
            !!this.props.deleteRow
              ? rowContent => this.deleteRow(rowContent)
              : null
          }
        />
      );
    });

    //Если ограничений нет — скроллы не нужны
    if (
      typeof this.props.maxWidth === "undefined" &&
      typeof this.props.maxHeight === "undefined"
    ) {
      return content;
    } else {
      return (
        <ReactCustomScroll
          noScroll={this.props.noScroll}
          //Задаем стиль
          style={{
            width: this.props.maxWidth,
            height: "calc(" + this.props.maxHeight + " - 48px)"
          }}
          ref={ref => {
            this._scrollBarRef = ref;
          }}
        >
          {content}
        </ReactCustomScroll>
      );
    }
  }

  render() {
    return (
      <div className="tableWrapper" style={{ maxHeight: this.props.maxHeight }}>
        <div className="table">
          {this.getHeader()}
          {this.getContent()}
          <SaveMark
            marginLeft={this.getTableWidth()}
            isSaving={this.props.isUpdating}
          />
        </div>
      </div>
    );
  }
}

export default Table;
