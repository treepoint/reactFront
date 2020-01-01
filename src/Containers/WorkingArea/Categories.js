import React from "react";
import Table from "../../Components/Table/Table";
import {
  getUserCategories,
  updateCategory,
  createCategory,
  deleteCategory
} from "../../APIController/APIController";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.getUserCategories();
  }

  getUserCategories(callback) {
    let promise = getUserCategories();

    promise.then(result => {
      if (Array.isArray(result)) {
        if (typeof callback === "function") {
          this.setState({ categoriesList: result }, () => callback());
        } else {
          this.setState({ categoriesList: result });
        }
      }
    });
  }

  //Добавим лог по задаче в ДБ
  addCategoryToDataBase() {
    let promise = createCategory({
      name: "",
      description: ""
    });

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getUserCategories();
      }
    });
  }

  //Удалим лог по задаче из ДБ
  deleteCategoryFromDataBase(category) {
    let promise = deleteCategory(category.id);

    promise.then(result => {
      if (result === "{success}") {
        this.getUserCategories();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(category, callback) {
    let promise = updateCategory(category.id, category);

    promise.then(result => {
      if (typeof result.affectedRows === "number") {
        this.getUserCategories(callback);
      }
    });
  }

  render() {
    //Соберем таблицу для отображения
    let categories = [];
    categories[0] = [
      {
        key: "id",
        type: "hidden",
        disabled: true,
        value: "ID",
        style: {}
      },
      {
        key: "name",
        type: "string",
        disabled: true,
        value: "Название",
        style: { width: 220 }
      },
      {
        key: "description",
        type: "string",
        value: "Описание",
        disabled: true,
        style: { width: 400 }
      }
    ];

    this.state.categoriesList.forEach(category => {
      categories.push([
        {
          key: "id",
          type: "hidden",
          disabled: true,
          value: category.id,
          style: {}
        },
        {
          key: "name",
          type: "string",
          disabled: false,
          value: category.name,
          style: {}
        },
        {
          key: "description",
          type: "string",
          disabled: false,
          value: category.description,
          style: {}
        }
      ]);
    });

    return (
      <Table
        isEditable={true}
        isResizeble={true}
        isSingleLineMode={true}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        addRow={() => this.addCategoryToDataBase()}
        deleteRow={row => this.deleteCategoryFromDataBase(row)}
        update={() => this.getUserCategories()}
      >
        {categories}
      </Table>
    );
  }
}

export default Categories;
