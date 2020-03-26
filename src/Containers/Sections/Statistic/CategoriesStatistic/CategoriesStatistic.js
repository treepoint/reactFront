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
import StatisticTotal from "../../../../Components/StatisticTotal/StatisticTotal";
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
import "./CategoriesStatistic.css";

class CategoriesStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: 0
    };
  }

  componentDidMount() {
    //Сбросим если есть
    this.props.clearCategoriesStatisticByPeriod();

    //По умолчанию тянем статистику за сегодня
    this.props.fetchCategoriesStatisticByPeriod();

    //посчитаем время итого
    this.getTotalTime();
  }

  componentDidUpdate() {
    //посчитаем время итого
    this.getTotalTime();
  }

  getTotalTime() {
    let totalTime = 0;

    //Получим статистику
    const statistic = this.props.categoriesStatisticByPeriod;

    for (var s in statistic) {
      totalTime += statistic[s].execution_time;
    }

    if (this.state.totalTime !== totalTime) {
      this.setState({ totalTime });
    }
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
          width: 450
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
      <React.Fragment>
        <DatePeriodPickerCarousel
          onPickDate={(dateFrom, dateTo) =>
            this.props.fetchCategoriesStatisticByPeriod(dateFrom, dateTo)
          }
        />
        <Table
          isResizeble={false}
          isEditable={false}
          notFoundMessage="Нет данных для отображения. Выберите другой период или задайте другие даты."
        >
          {this.getContent()}
        </Table>
        <div className="statisticTotalContainer">
          <StatisticTotal totalValue={getTimeFromMins(this.state.totalTime)} />
        </div>
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
