import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import {
  getUserCategories,
  updateCategory
} from "../../APIController/APIController";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.getUserCategories();
  }

  getUserCategories() {
    let promise = getUserCategories();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ categoriesList: result });
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(row, callback) {
    let category = {};

    row.forEach(item => {
      category[item.key] = item.value;
    });

    updateCategory(category.id, category);

    //Пока, если просто дошли до сюда, значит сохранили.
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  render() {
    //Соберем таблицу для отображения
    let categories = [];
    categories[0] = [
      { key: "id", type: "text", value: "ID", style: { width: 30 } },
      { key: "name", type: "text", value: "Название", style: { width: 220 } },
      {
        key: "description",
        type: "text",
        value: "Описание",
        style: { width: 220 }
      }
    ];

    this.state.categoriesList.forEach(category => {
      categories.push([
        { key: "id", type: "text", value: category.id, style: {} },
        { key: "name", type: "text", value: category.name, style: {} },
        {
          key: "description",
          type: "text",
          value: category.description,
          style: {}
        }
      ]);
    });

    return (
      <div>
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRowToDataBase={(row, callback) =>
            this.saveRowToDataBase(row, callback)
          }
        >
          {categories}
        </Table>
        <Button
          value="Обновить список категорий"
          isPrimary={true}
          onClick={() => this.getUserCategories()}
        />
      </div>
    );
  }
}

export default Categories;
