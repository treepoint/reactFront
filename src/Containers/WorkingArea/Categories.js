import React from "react";
import Button from "../../Components/Button/Button";
import Table from "../../Components/Table/Table";
import { getUserCategories } from "../../APIController/APIController";

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

  render() {
    //Соберем таблицу для отображения
    let categories = [];
    categories[0] = [
      { key: "id", value: "ID", style: { width: 30 } },
      { key: "name", value: "Название", style: { width: 220 } },
      { key: "description", value: "Описание", style: { width: 220 } }
    ];

    this.state.categoriesList.forEach(category => {
      categories.push([
        { key: "id", value: category.id, style: {} },
        { key: "name", value: category.name, style: {} },
        { key: "description", value: category.description, style: {} }
      ]);
    });

    return (
      <div>
        <Table isEditable={true} isResizeble={true}>
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
