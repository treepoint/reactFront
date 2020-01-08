import React from "react";
import Table from "../../../Components/Table/Table";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";
import {
  getUserCategories,
  updateCategory,
  createCategory,
  deleteCategory
} from "../../../APIController/APIController";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      deleteModalWindow: { isHidden: true, row: null }
    };
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
      name_style: "{}",
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
  deleteRowFromDataBase() {
    deleteCategory(this.state.deleteModalWindow.row.id, ok => {
      if (ok) {
        this.getUserCategories();
      }
    });
  }

  //Закрыть модальное окно
  closeDeleteModal() {
    this.setState({ deleteModalWindow: { isHidden: true, row: null } });
  }

  //Показать модальное окно
  showDeleteModal(row) {
    this.setState({ deleteModalWindow: { isHidden: false, row } });
  }

  //Соберем таблицу для отображения
  getContent() {
    let content = [
      [
        {
          key: "id",
          type: "hidden",
          disabled: true,
          value: "ID"
        },
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Название",
          width: 220
        },
        {
          key: "description",
          type: "string",
          value: "Описание",
          disabled: true,
          width: 400
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
            value: category.id
          },
          {
            key: "name",
            type: "string",
            disabled: false,
            value: category.name,
            style: category.name_style
          },
          {
            key: "description",
            type: "text",
            disabled: false,
            value: category.description
          }
        ]);
      }
    });

    return content;
  }

  render() {
    return (
      <React.Fragment>
        <ConfirmModalWindow
          title="Удалить категорию?"
          message="Категория останется назначенной для текущих и выполненных задач, но будет недоступна для новых"
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() => this.deleteRowFromDataBase()}
        />
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRow={(row, callback) => this.saveRowToDataBase(row, callback)}
          addRow={() => this.addCategoryToDataBase()}
          deleteRow={row => this.showDeleteModal(row)}
          update={() => this.getUserCategories()}
        >
          {this.getContent()}
        </Table>
      </React.Fragment>
    );
  }
}

export default Categories;
