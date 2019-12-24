import React from "react";
import Cell from "../Cell/Cell";
import "./Row.css";

class Row extends React.Component {
  constructor() {
    super();
    this.state = {
      //Текущая высота строки. Если задано — считается значением по-умолчанию
      height: 34,
      //Прошлая ширина и высота. Нужны для вычисления смещения между текущей шириной\высотой и прошлой
      prevHeight: 0,
      rowContent: []
    };
  }

  componentDidMount() {
    this.updateRowContent();
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
  onChangeHTMLContent(HTMLContent, index) {
    //Получим текущий массив, содержащий значения всех ячеек
    let rowContent = this.state.rowContent;

    //Обновим в нем нужное значение
    rowContent[index].value = HTMLContent;

    //Добавим его в state
    this.setState({ rowContent });

    //Передадим выше, для сохранения в ДБ
    this.props.saveRowToDataBase(rowContent);
  }

  //Обновим контент в ячейках, если он не совпадает с тем, что есть сейчас
  updateRowContent() {
    if (this.state.rowContent !== this.props.rowsContent) {
      this.setState({ rowContent: this.props.rowsContent });
    }
  }

  render() {
    this.updateRowContent();
    //Из пришедшего описания столбцов соберем ячейки
    let cells = this.props.colsDescription.map((column, index) => {
      return (
        <Cell
          isEditable={this.props.isEditable}
          isResizeble={this.props.isResizeble}
          isStylable={this.props.isStylable}
          isHeader={this.props.isHeader}
          scrollLeft={this.props.scrollLeft}
          uuid={this.props.uuid}
          width={column.width}
          height={this.state.height}
          initHtmlContent={this.state.rowContent[index]}
          changeUUID={uuid => this.changeUUID(uuid)}
          changeWidth={width => this.changeWidth(width, index)}
          changeHeight={height => this.changeHeight(height)}
          stopChangeDimensions={() => this.stopChangeDimensions()}
          onChangeHTMLContent={HTMLContent =>
            this.onChangeHTMLContent(HTMLContent, index)
          }
        />
      );
    });

    return <div className="row">{cells}</div>;
  }
}

export default Row;
