import React from "react";
import Table from "../../../Components/Table/Table";
import {
  getUserCategories,
  updateCategory,
  createCategory,
  deleteCategory
} from "../../../APIController/APIController";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.getUserCategories();
  }

  //Получим все категории пользователя
  getUserCategories(callback) {
    getUserCategories(result => {
      if (typeof callback === "function") {
        this.setState({ categoriesList: result }, () => callback());
      } else {
        this.setState({ categoriesList: result });
      }
    });
  }

  //Добавим категорию
  addCategoryToDataBase() {
    let category = {
      name: "",
      description: ""
    };

    createCategory(category, ok => {
      if (ok) {
        this.getUserCategories();
      }
    });
  }

  //Сохраним изменяемую строку в ДБ
  saveRowToDataBase(category, callback) {
    updateCategory(category, ok => {
      if (ok) {
        this.getUserCategories(callback);
      }
    });
  }

  //Удалим категорию
  deleteRowFromDataBase(category) {
    deleteCategory(category.id, ok => {
      if (ok) {
        this.getUserCategories();
      }
    });
  }

  //Соберем таблицу для отображения
  getContent() {
    let content = [
      [
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
      ]
    ];

    this.state.categoriesList.forEach(category => {
      //Если категории не закрыты — отобразим их
      if (category.close_date === null) {
        content.push([
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
      }
    });

    return content;
  }

  render() {
    return (
      <Table
        isEditable={true}
        isResizeble={true}
        isSingleLineMode={true}
        saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
        addRow={() => this.addCategoryToDataBase()}
        deleteRow={row => this.deleteRowFromDataBase(row)}
        update={() => this.getUserCategories()}
      >
        {this.getContent()}
      </Table>
    );
  }
}

export default Categories;
