import React from "react";
import Page from "../../Components/Page/Page";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { getUserCategories } from "../../APIController/APIController";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categoriesList: [] };
  }

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    let promise = getUserCategories();

    promise.then(result => {
      if (Array.isArray(result)) {
        this.setState({ categoriesList: result });
      }
    });
  }

  render() {
    //Соберем таблицу для отображения
    let categories = [];
    categories[0] = ["ID", "Название", "Описание"];

    this.state.categoriesList.forEach(category => {
      categories.push([category.id, category.name, category.description]);
    });

    return (
      <div>
        <Page title="Список категорий">
          <Table
            headerEditable={false}
            bodyEditable={false}
            isResizeble={false}
          >
            {categories}
          </Table>
          <Button
            value="Обновить список категорий"
            isPrimary={true}
            onClick={() => this.getCategories()}
          />
        </Page>
      </div>
    );
  }
}

export default Categories;
