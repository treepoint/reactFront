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
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
//CSS
import "./TasksStatistic.css";

class TasksStatistic extends React.Component {
  componentDidMount() {
    //Сбросим если есть
    this.props.clearTasksStatisticByPeriod();

    //По умолчанию тянем статистику за сегодня
    this.props.fetchTasksStatisticByPeriod();
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
          value: "Время, всего",
          width: 122
        }
      ]
    ];

    //Получим список уведомлений
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
