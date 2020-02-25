import React from "react";
//Redux
import { connect } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../../Store/actions/categories";
//Компоненты
import Table from "../../../Components/Table/Table";
import Page from "../../../Components/Page/Page";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalWindow: { isHidden: true, row: null }
    };
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAuthState && !prevProps.userAuthState) {
      this.props.fetchCategories();
    }
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
          width: 320
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

    let categories = this.props.categories;

    for (var c in categories) {
      //Если категории не закрыты — отобразим их
      if (categories[c].close_date === null) {
        content.push([
          {
            key: "id",
            type: "hidden",
            disabled: true,
            value: categories[c].id
          },
          {
            key: "name",
            type: "string",
            disabled: false,
            value: categories[c].name,
            style: categories[c].name_style
          },
          {
            key: "description",
            type: "text",
            disabled: false,
            value: categories[c].description
          }
        ]);
      }
    }

    return content;
  }

  render() {
    return (
      <Page title="Управление категориями задач" isCustomContent={true}>
        <ConfirmModalWindow
          title="Удалить категорию?"
          message="Категория останется назначенной для текущих и выполненных задач, но будет недоступна для новых"
          isHidden={this.state.deleteModalWindow.isHidden}
          onCancel={() => this.closeDeleteModal()}
          onConfirm={() =>
            this.props.deleteCategory(this.state.deleteModalWindow.row.id)
          }
        />
        <Table
          isEditable={true}
          isResizeble={true}
          isSingleLineMode={true}
          saveRow={category => this.props.updateCategory(category)}
          addRow={() => this.props.createCategory()}
          deleteRow={row => this.showDeleteModal(row)}
          isUpdating={this.props.isUpdating}
        >
          {this.getContent()}
        </Table>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    userAuthState: state.userAuthState,
    isUpdating: state.categoriesIsUpdating
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories());
    },
    createCategory: () => {
      dispatch(createCategory());
    },
    deleteCategory: id => {
      dispatch(deleteCategory(id));
    },
    updateCategory: category => {
      dispatch(updateCategory(category));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
