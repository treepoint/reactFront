import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import {
  fetchCategoriesStatisticByPeriod,
  clearCategoriesStatisticByPeriod
} from "../../../../Store/actions/statistics";
//Подключаем компоненты
import Table from "../../../../Components/Table/Table";
import DatePeriodPickerCarousel from "../../../../Components/DatePeriodPickerCarousel/DatePeriodPickerCarousel";
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
import "./CategoriesStatistic.css";

class CategoriesStatistic extends React.Component {
  componentDidMount() {
    //Сбросим если есть
    this.props.clearCategoriesStatisticByPeriod();

    //По умолчанию тянем статистику за сегодня
    this.props.fetchCategoriesStatisticByPeriod();
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
          width: 300
        },
        {
          key: "type",
          type: "string",
          disabled: true,
          value: "Время, всего",
          width: 122
        }
      ]
    ];

    //Получим список уведомлений
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
      <React.Fragment>
        <DatePeriodPickerCarousel
          onPickDate={(dateFrom, dateTo) =>
            this.props.fetchCategoriesStatisticByPeriod(dateFrom, dateTo)
          }
        />
        <Table isResizeble={false} isEditable={false}>
          {this.getContent()}
        </Table>
      </React.Fragment>
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
    fetchCategoriesStatisticByPeriod: (dateFrom, dateTo) => {
      dispatch(fetchCategoriesStatisticByPeriod(dateFrom, dateTo));
    },
    clearCategoriesStatisticByPeriod: () => {
      dispatch(clearCategoriesStatisticByPeriod());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesStatistic);
