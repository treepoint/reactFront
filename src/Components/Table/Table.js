import React from "react";
//Подключаем компоненты
import TableWrapper from "./TableWrapper/TableWrapper";
import Row from "./Row/Row";
import "./Table.css";

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      tableWidth: 0,
      colsDescription: [],
      tableHeader: [],
      tableBody: [],
      table: [],
      uuid: "",
      scrollLeft: 0
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

  render() {
    let rowTable = this.isValidTable(this.props.children);

    this.setTable(rowTable);

    //Соберем тушку для отрисовки
    let table = this.state.table.map((row, index) => {
      return (
        <Row
          //Указываем, на наличие шапки. По умолчанию — есть
          isHeader={!!!this.props.isHeaderless && index === 0 ? true : false}
          //Задаем возможность редактирования контента в ячейках
          isEditable={this.props.isEditable}
          //Задаем возможность изменения размеров ячеек
          isResizeble={this.props.isResizeble}
          //Задаем возможность применения стилей
          isStylable={this.props.isStylable}
          //Задаем однострочный режим
          isSingleLineMode={this.props.isSingleLineMode}
          //Прокидывем UUID ячейки, которая сейчас изменяет свои размеры
          uuid={this.state.uuid}
          //Ширина всей таблицы, ну или ширина каждой строки
          width={this.state.tableWidth}
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
          saveRowToDataBase={rowContent =>
            this.props.saveRowToDataBase(rowContent)
          }
        />
      );
    });

    return (
      <TableWrapper
        handleHorizonalScroll={scrollLeft => {
          this.handleHorizonalScroll(scrollLeft);
        }}
      >
        <div className="table">{table}</div>
      </TableWrapper>
    );
  }
}

export default Table;
