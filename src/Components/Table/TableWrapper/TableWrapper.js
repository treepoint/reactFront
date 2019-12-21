import React from "react";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
import "./TableWrapper.css";

class TableWrapper extends React.Component {
  //Обрабатываем горизонтальный скролл для правильного позиционирования элементов в таблице
  handleHorizonalScroll(event) {
    this.props.handleHorizonalScroll(this._scrollBarRef.scrollLeft);
  }

  render() {
    return (
      <ReactCustomScroll
        //Убираем вертикальный скролл
        noScrollY
        //Добавление определение высоты блока со скроллами на основании контента внутри
        translateContentSizeYToHolder
        //Обрабатываем скролл
        onScroll={event => this.handleHorizonalScroll(event)}
        ref={ref => {
          this._scrollBarRef = ref;
        }}
        //Задаем стиль
        style={{ width: "100%", height: "calc(40vh - 126px)" }}
      >
        <div className="tableWrapper"> {this.props.children}</div>
      </ReactCustomScroll>
    );
  }
}

export default TableWrapper;
