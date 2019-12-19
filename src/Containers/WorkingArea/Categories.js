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
      { value: "ID", style: { width: 30 } },
      { value: "Название", style: { width: 220 } },
      { value: "Описание", style: { width: 220 } }
    ];

    this.state.categoriesList.forEach(category => {
      categories.push([
        { value: category.id, style: {} },
        { value: category.name, style: {} },
        { value: category.description, style: {} }
      ]);
    });

    return (
      <div>
        <Table headerEditable={false} bodyEditable={true} isResizeble={true}>
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
