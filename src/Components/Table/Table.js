import React from "react";
import "./Table.css";

/*
 * Концепция какая. Таблица — массив массивов. Примерно так:
 * table = [] //объявляем таблицу
 * table[0] = ["item", "item2", "item3"] //шапка
 * table[1] = ["value", "value", "value"] //строка
 *
 * Собственно поэтому сначало отдельно рисуем шапку, потом тушку.
 *
 * В перспективе будет компонент, который умеет:
 * 1. Принять в себя таблицу
 * 2. Запихать её в стейт
 * 3. Отрисовать содержимое
 * 4. Изменять содержимое и оформление содержимого
 *
 * В идеале каждая ячейка будет объектом из которых потом будет воссоздана таблица
 *
 */

class Table extends React.Component {
  render() {
    let tableBody = this.props.children;
    let tableHeader = tableBody.shift();

    return (
      <table className="table">
        <tbody>
          <tr>
            {/* Отрисовываем шапку */
            tableHeader.map(item => (
              <th>{item}</th>
            ))}
          </tr>
          {/* Отрисовываем тело таблицы */
          Object.keys(tableBody).map(row => (
            <tr>
              {tableBody[row].map(item => (
                <td>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
