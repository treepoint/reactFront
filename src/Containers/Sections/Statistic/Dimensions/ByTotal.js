import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { fetchTotalStatisticByPeriod } from "../../../../Store/actions/statistics";
//Дополнительные библиотеки
import { getTimeFromMins } from "../../../../Libs/TimeUtils";
//CSS
import "./ByTotal.css";

class ByTotal extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dateFrom !== this.props.dateFrom || prevProps.dateTo !== this.props.dateTo) {
      this.fetchData();
    }
  }

  fetchData() {
    //получим время итого
    this.props.fetchTotalStatisticByPeriod(
      this.props.dateFrom,
      this.props.dateTo
    );
  }

  getTotalValue() {
    //Получим статистику
    const statistic = this.props.totalStatisticByPeriod;

    for (var s in statistic) {

      if (statistic[s].project_id === this.props.currentProjectId) {
        return getTimeFromMins(statistic[s].execution_time);
      }
    }
  }

  render() {
    return (
      <div className="byTotal">
        <div className="byTotalLable">Итого: </div>
        {this.getTotalValue()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalStatisticByPeriod: state.totalStatisticByPeriod,
    currentProjectId: state.userSettings.project_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTotalStatisticByPeriod: (dateFrom, dateTo) => {
      dispatch(fetchTotalStatisticByPeriod(dateFrom, dateTo));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ByTotal);
