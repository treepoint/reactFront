import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import {
  fetchTasksStatisticByPeriod,
  clearTasksStatisticByPeriod
} from "../../../../Store/actions/statistics";
//Подключаем компоненты
import Table from "../../../../Components/Table/Table";
import DatePeriodPickerCarousel from "../../../../Components/DatePeriodPickerCarousel/DatePeriodPickerCarousel";
import StatisticTotal from "../../../../Components/StatisticTotal/StatisticTotal";
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
//CSS
import "./TasksStatistic.css";

class TasksStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTime: 0
    };
  }

  componentDidMount() {
    //Сбросим если есть
    this.props.clearTasksStatisticByPeriod();

    //По умолчанию тянем статистику за сегодня
    this.props.fetchTasksStatisticByPeriod();

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
    const statistic = this.props.tasksStatisticByPeriod;

    for (var s in statistic) {
      totalTime += statistic[s].execution_time;
    }

    if (this.state.totalTime !== totalTime) {
      this.setState({ totalTime });
    }
  }

  getContent() {
    let content = [
      [
        {
          key: "name",
          type: "string",
          disabled: true,
          value: "Задача",
          width: 450
        },
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
          value: "Время",
          width: 60
        }
      ]
    ];

    //Получим статистику
    const statistic = this.props.tasksStatisticByPeriod;

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
          key: "category_name",
          type: "string",
          disabled: true,
          value: statistic[s].category_name,
          style: statistic[s].category_name_style
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
            this.props.fetchTasksStatisticByPeriod(dateFrom, dateTo)
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
    tasksStatisticByPeriod: state.tasksStatisticByPeriod
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasksStatisticByPeriod: (dateFrom, dateTo) => {
      dispatch(fetchTasksStatisticByPeriod(dateFrom, dateTo));
    },
    clearTasksStatisticByPeriod: () => {
      dispatch(clearTasksStatisticByPeriod());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksStatistic);
