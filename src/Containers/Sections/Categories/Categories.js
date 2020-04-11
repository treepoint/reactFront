import React from "react";
//Redux
import { connect } from "react-redux";
import {
  fetchCategories,
  createCategory,
  archiveCategory,
  openCategory,
  updateCategory
} from "../../../Store/actions/categories";
//Компоненты
import Table from "../../../Components/Table/Table";
import Page from "../../../Components/Page/Page";
import ConfirmModalWindow from "../../../Components/ConfirmModalWindow/ConfirmModalWindow";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archiveModalWindow: { isHidden: true, row: null },
      isArchived: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAuthState && !prevProps.userAuthState) {
      this.props.fetchCategories();
    }
  }

  //Закрыть модальное окно
  closeArchiveModal() {
    this.setState({ archiveModalWindow: { isHidden: true, row: null } });
  }

  //Показать модальное окно
  showArchiveModal(row) {
    this.setState({ archiveModalWindow: { isHidden: false, row } });
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
          width: 300
        },
        {
          key: "active_tasks_count",
          type: "string",
          value: "Активных задач",
          disabled: true,
          width: 138
        },
        {
          key: "description",
          type: "string",
          hidable: true,
          value: "Описание",
          disabled: true,
          width: 400
        }
      ]
    ];

    let categories = this.props.categories;

    for (var c in categories) {
      //Если категории не закрыты — отобразим их
      if (
        (categories[c].close_date === null && !this.state.isArchived) ||
        (categories[c].close_date !== null && this.state.isArchived)
      ) {
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
            key: "active_tasks_count",
            type: "string",
            disabled: true,
            textAlign: "center",
            value: categories[c].active_tasks_count
          },
          {
            key: "description",
            type: "text",
            disabled: false,
            hidable: true,
            value: categories[c].description
          }
        ]);
      }
    }

    return content;
  }

  render() {
    //Соберем меню страницы
    let anchorLinksArray = [
      {
        value: "Текущие",
        callback: () => this.setState({ isArchived: false }),
        isCurrent: !this.state.isArchived
      },
      {
        value: "Архив",
        callback: () => this.setState({ isArchived: true }),
        isCurrent: this.state.isArchived
      }
    ];

    return (
      <Page
        title="Категории"
        isCustomContent={true}
        anchorLinksArray={anchorLinksArray}
      >
        <ConfirmModalWindow
          title="Заархивировать категорию?"
          message="Категория останется назначенной для текущих и выполненных задач, но будет недоступна для новых. 
          Категории по которым были задачи будут доступны в архиве."
          isHidden={this.state.archiveModalWindow.isHidden}
          onCancel={() => this.closeArchiveModal()}
          onConfirm={() =>
            this.props.archiveCategory(this.state.archiveModalWindow.row.id)
          }
        />
        <Table
          isResizeble={true}
          isSingleLineMode={true}
          saveRow={category => this.props.updateCategory(category)}
          addRow={
            !!!this.state.isArchived ? () => this.props.createCategory() : null
          }
          archiveRow={
            !!!this.state.isArchived ? row => this.showArchiveModal(row) : null
          }
          dearchiveRow={
            !!!this.state.isArchived ? null : id => this.props.openCategory(id)
          }
          isUpdating={this.props.isUpdating}
          notFoundMessage={
            !!!this.state.isArchived
              ? "Нет активных категорий. Добавьте новую с помощью кнопки «+»."
              : "Нет архивных категорий."
          }
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
    archiveCategory: id => {
      dispatch(archiveCategory(id));
    },
    openCategory: id => {
      dispatch(openCategory(id));
    },
    updateCategory: category => {
      dispatch(updateCategory(category));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
