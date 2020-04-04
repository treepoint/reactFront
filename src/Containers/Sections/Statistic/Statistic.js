import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { fetchTotalStatisticByPeriod } from "../../../Store/actions/statistics";
import { setScrollTop, setScrollLeft } from "../../../Store/actions/page";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Подключаем базовые компоненты
import Page from "../../../Components/Page/Page";
import DatePeriodPickerCarousel from "../../../Components/DatePeriodPickerCarousel/DatePeriodPickerCarousel";
//Подключаем компоненты статистики
import ByCategories from "./Dimensions/ByCategories";
import ByTasks from "./Dimensions/ByTasks";
import ByDays from "./Dimensions/ByDays";
import StatisticTotal from "../../../Components/StatisticTotal/StatisticTotal";
//Дополнительные библиотеки
import { getTimeFromMins, getCurrentFormatDate } from "../../../Libs/TimeUtils";
//CSS
import "./Statistic.css";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: getCurrentFormatDate(),
      dateTo: getCurrentFormatDate(),
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  //Нужно для правильного позиционирования fixed элементов в тасках
  handleScroll() {
    if (this._scrollBarRef !== null) {
      this.props.setScrollTop(this._scrollBarRef.scrollTop);
      this.props.setScrollLeft(this._scrollBarRef.scrollLeft);
    }
  }

  fetchData() {
    //получим время итого
    this.props.fetchTotalStatisticByPeriod(
      this.state.dateFrom,
      this.state.dateTo
    );
  }

  render() {
    return (
      <Page
        title="Статистика"
        isCustomContent={true}
        isPrivate={true}
        isNotScrollable={true}
      >
        <div className="statisticDatePickerContainer">
          <DatePeriodPickerCarousel
            onPickDate={(dateFrom, dateTo) => {
              this.setState({ dateFrom, dateTo });
            }}
          />
        </div>
        <ReactCustomScroll
          //Задаем стиль
          style={{
            width: "100%",
            height: "calc(-145px + 100vh)",
          }}
          ref={(ref) => {
            this._scrollBarRef = ref;
          }}
          //Обрабатываем скролл
          onScrollStop={() => this.handleScroll()}
        >
          <div className="tablesContainer">
            {/*Статистика по дням в виде графика*/}
            <ByDays dateFrom={this.state.dateFrom} dateTo={this.state.dateTo} />
            <div className="statisticTableContainter">
              {/*Статистика по задачам в виде таблицы*/}
              <ByCategories
                dateFrom={this.state.dateFrom}
                dateTo={this.state.dateTo}
              />
            </div>
            <div className="statisticTableContainter">
              {/*Статистика по задачам в виде таблицы*/}
              <ByTasks
                dateFrom={this.state.dateFrom}
                dateTo={this.state.dateTo}
              />
            </div>
            <div className="statisticTotalContainer">
              <StatisticTotal
                totalValue={getTimeFromMins(this.props.totalStatisticByPeriod)}
              />
            </div>
          </div>
        </ReactCustomScroll>
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalStatisticByPeriod: state.totalStatisticByPeriod,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTotalStatisticByPeriod: (dateFrom, dateTo) => {
      dispatch(fetchTotalStatisticByPeriod(dateFrom, dateTo));
    },
    setScrollTop: (number) => {
      dispatch(setScrollTop(number));
    },
    setScrollLeft: (number) => {
      dispatch(setScrollLeft(number));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);
