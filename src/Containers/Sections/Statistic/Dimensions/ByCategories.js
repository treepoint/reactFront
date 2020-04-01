import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import {
  fetchCategoriesStatisticByPeriod,
  clearCategoriesStatisticByPeriod
} from "../../../../Store/actions/statistics";
//Подключаем компоненты
import Table from "../../../../Components/Table/Table";
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";

class ByCategories extends React.PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.dateFrom !== this.props.dateFrom ||
      prevProps.dateTo !== this.props.dateTo
    ) {
      this.fetchData();
    }
  }

  fetchData() {
    //Сбросим если есть
    this.props.clearCategoriesStatisticByPeriod();

    this.props.fetchCategoriesStatisticByPeriod(
      this.props.dateFrom,
      this.props.dateTo
    );
  }

  //Соберем контент для таблицы
  getContent() {
    let content = [
      [
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Категория",
          width: 250
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Время",
          width: 60
        }
      ]
    ];

    //Получим статистику
    const statistic = this.props.categoriesStatisticByPeriod;

    for (var s in statistic) {
      content.push([
        {
          key: "name",
          type: "string",
          disabled: true,
          value: statistic[s].name,
          style: statistic[s].name_style
        },
        {
          key: "type_id",
          type: "time",
          disabled: true,
          value: getTimeFromMins(statistic[s].execution_time)
        }
      ]);
    }

    return content;
  }

  render() {
    return (
      <Table
        isResizeble={false}
        isEditable={false}
        notFoundMessage="Нет данных. Выберите другие даты."
      >
        {this.getContent()}
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoriesStatisticByPeriod: state.categoriesStatisticByPeriod
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCategoriesStatisticByPeriod: () => {
      dispatch(clearCategoriesStatisticByPeriod());
    },
    fetchCategoriesStatisticByPeriod: (dateFrom, dateTo) => {
      dispatch(fetchCategoriesStatisticByPeriod(dateFrom, dateTo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ByCategories);
