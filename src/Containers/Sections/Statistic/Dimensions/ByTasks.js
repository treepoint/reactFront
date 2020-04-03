import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import {
  fetchTasksStatisticByPeriod,
  clearTasksStatisticByPeriod
} from "../../../../Store/actions/statistics";
//Подключаем компоненты
import Table from "../../../../Components/Table/Table";
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";

class ByTasks extends React.Component {
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
    this.props.clearTasksStatisticByPeriod();

    this.props.fetchTasksStatisticByPeriod(
      this.props.dateFrom,
      this.props.dateTo
    );
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
          hidable: true,
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
          hidable: true,
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
    tasksStatisticByPeriod: state.tasksStatisticByPeriod
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearTasksStatisticByPeriod: () => {
      dispatch(clearTasksStatisticByPeriod());
    },
    fetchTasksStatisticByPeriod: (dateFrom, dateTo) => {
      dispatch(fetchTasksStatisticByPeriod(dateFrom, dateTo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ByTasks);
