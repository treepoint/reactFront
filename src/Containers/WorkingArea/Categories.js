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
  saveRowToDataBase(category, callback) {
    updateCategory(category.id, category);

    //Пока, если просто дошли до сюда, значит сохранили.
    //Понятно, что это не самое хорошее решение, но тестим пока так
    callback();
  }

  render() {
    //Соберем таблицу для отображения
    let categories = [];
    categories[0] = [
      { key: "id", type: "string", value: "ID", style: { width: 30 } },
      { key: "name", type: "string", value: "Название", style: { width: 220 } },
      {
        key: "description",
        type: "string",
        value: "Описание",
        style: { width: 220 }
      }
    ];

    this.state.categoriesList.forEach(category => {
      categories.push([
        { key: "id", type: "string", value: category.id, style: {} },
        { key: "name", type: "string", value: category.name, style: {} },
        {
          key: "description",
          type: "string",
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
