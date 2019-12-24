import React from "react";
//Подключаем компоненты
import TableWrapper from "./TableWrapper/TableWrapper";
import SaveMark from "./SaveMark/SaveMark";
import Row from "./Row/Row";
import "./Table.css";

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      colsDescription: [],
      tableHeader: [],
      tableBody: [],
      table: [],
      uuid: "",
      scrollLeft: 0,
      displaySaveMark: "notInit"
    };
  }

  componentDidMount() {
    let rowTable = this.isValidTable(this.props.children);
    this.setDescription(rowTable);
  }

  setTable(table) {
    //Первый элемент — всегда заголовок таблицы. Достанем его
    if (JSON.stringify(table) !== JSON.stringify(this.state.table)) {
      this.setState({
        table
      });
    }
  }

  setDescription(table) {
    //Соберем массив, описывающий столбцы
    let colsDescription = table[0].map(column => {
      //Если есть описание — получим данные оттуда. Иначе — стандартные
      try {
        return {
          //Текущая, ну или начальная ширина
          width: column.style.width,
          //И прошлая ширина. По умолчанию всегда 0
          prevWidth: 0
        };
      } catch {
        return {
          width: 200,
          prevWidth: 0
        };
      }
    });

    //Запишем в стейт описание столбцов
    this.setState({
      colsDescription
    });
  }

  getTableWidth() {
    let tableWidth = 0;

    this.state.colsDescription.forEach(col => {
      if (typeof col.width === "number") {
        tableWidth += col.width;
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

  //Чекаем, что нам передали валидную таблицу
  isValidTable(table) {
    if (typeof table !== "object") {
      return [["Ошибка"], ["Передан не массив"]];
    }

    if (table.length === 0) {
      return [["Ошибка"], ["Передан пустой массив"]];
    }

    return table;
  }

  //Обрабатываем горизонтальный скролл для правильного позиционирования элементов в таблице
  handleHorizonalScroll(scrollLeft) {
    this.setState({ scrollLeft });
  }

  setDisplaySaveMarkFalse() {
    setTimeout(
      function() {
        //Start the timer
        this.setState({ displaySaveMark: false }); //After 1 second, set render to true
      }.bind(this),
      30
    );
  }

  saveRowToDataBase(rowContent) {
    //Если не функция — ничего делать не будем. Значит её не передали
    if (typeof this.props.saveRowToDataBase === "function") {
      this.setState({ displaySaveMark: true });

      //Разберем контент и вернем уже объект, с которым будем работать дальше
      let object = {};

      rowContent.forEach(item => {
        switch (item.type) {
          case "string":
            object[item.key] = item.value;
            break;
          case "text":
            object[item.key] = item.value;
            break;
          case "select":
            object[item.key] = item.value.current;
            break;
          default:
            return;
        }
      });

      this.props.saveRowToDataBase(object, () => {
        this.setDisplaySaveMarkFalse();
      });
    }
  }

  render() {
    let rowTable = this.isValidTable(this.props.children);

    this.setTable(rowTable);

    //Соберем тушку для отрисовки
    let table = this.state.table.map((row, index) => {
      return (
        <Row
          //Указываем, на наличие шапки. По умолчанию — есть
          isHeader={!!!this.props.isHeaderless && index === 0 ? true : false}
          //Задаем возможность изменения размеров ячеек
          isResizeble={this.props.isResizeble}
          //Задаем возможность применения стилей
          isStylable={this.props.isStylable}
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
          //Обработаем изменения скролла
          scrollLeft={this.state.scrollLeft}
          saveRowToDataBase={rowContent => this.saveRowToDataBase(rowContent)}
        />
      );
    });

    return (
      <TableWrapper
        handleHorizonalScroll={scrollLeft => {
          this.handleHorizonalScroll(scrollLeft);
        }}
      >
        <div className="table">
          {table}
          <SaveMark
            marginLeft={this.getTableWidth()}
            isDisplayed={this.state.displaySaveMark}
          />
        </div>
      </TableWrapper>
    );
  }
}

export default Table;
