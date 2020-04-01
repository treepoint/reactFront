import React from "react";
//Подключаем redux
import { connect } from "react-redux";
import { fetchStatisticByDaysForPeriod } from "../../../../Store/actions/statistics";
//Подключаем графики
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
//Подключаем красивые скроллы
import ReactCustomScroll from "react-scrollbars-custom";
//Дополнительные библиотеки
import {
  getHoursFromMins,
  getDDdotMMandShortDatNameByDate,
  getFormatHours,
  addDays,
  revokeDays
} from "../../../../Libs/TimeUtils";
//CSS
import "./ByDays.css";

class ByDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHour: 0,
      minHour: 0,
      ticks: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    //Если поменяли даты — подтянем данные
    if (
      prevProps.dateFrom !== this.props.dateFrom ||
      prevProps.dateTo !== this.props.dateTo
    ) {
      this.fetchData();
    }

    //Если поменялись данные — обновим часы
    if (
      prevProps.statisticByDaysForPeriod !== this.props.statisticByDaysForPeriod
    ) {
      this.setHoursAmplitude();
    }
  }

  fetchData() {
    //Получим сами данные, но здесь какая фишка. За один день — никогда не
    // интересно. Получаем минимум за указанный день +\- 1.
    if (this.props.dateFrom === this.props.dateTo) {
      console.log(this.props.dateFrom);
      this.props.fetchStatisticByDaysForPeriod(
        revokeDays(this.props.dateFrom, 1),
        addDays(this.props.dateTo, 1)
      );
    } else {
      this.props.fetchStatisticByDaysForPeriod(
        this.props.dateFrom,
        this.props.dateTo
      );
    }
  }

  //Проставим верхнюю и нижнюю границы часов
  setHoursAmplitude() {
    let statistic = [];
    let executionTimes = [];
    let maxHour = 0;
    let minHour = 0;

    statistic = this.props.statisticByDaysForPeriod;

    //У нас здесь как идет. Есть массив, в нем есть date и execution_time.
    //Нам, в свою очередь, надо получить минимальный и максимальный execution_time,
    //потом равномерно темперировать его на некоторые отрезки и их уже вернуть

    statistic.forEach(day => {
      executionTimes.push(day.execution_time);
    });

    //Получим минимальный и максимальный час исполнения
    maxHour = getHoursFromMins(Math.max.apply(null, executionTimes));
    minHour = getHoursFromMins(Math.min.apply(null, executionTimes));

    //Сохраним
    if (this.state.maxHour !== maxHour || this.state.minHour !== maxHour) {
      this.setState({ maxHour, minHour });
      this.getTicks(maxHour, minHour);
    }
  }

  //Получим контент для графика
  getData() {
    let statistic = [];
    let data = [];
    let today = new Date();
    today = getDDdotMMandShortDatNameByDate(today);

    statistic = this.props.statisticByDaysForPeriod;

    statistic.forEach(day => {
      let date = new Date(day.date);
      date = getDDdotMMandShortDatNameByDate(date);

      if (today === date) {
        data.push({
          name: "Сегодня",
          uv: day.execution_time
        });
      } else {
        data.push({
          name: date,
          uv: day.execution_time
        });
      }
    });

    return data;
  }

  //Получим контент для наложения на график левую часть графика. Иначе говоря «Рабочие часы»
  getWorkingHours() {
    let workingHours = [];

    //Пройдемся по часам — пушанем их
    let i = this.state.maxHour;

    workingHours.push(getFormatHours(this.state.maxHour + 1));

    while (i >= this.state.minHour) {
      workingHours.push(getFormatHours(i));
      i = i - 1;
    }

    return workingHours;
  }

  //Получим деления графика
  getTicks() {
    let ticks = [];

    //Пройдемся по часам — пушанем их
    let i = this.state.maxHour;

    ticks.push((this.state.maxHour + 1) * 60);

    while (i >= this.state.minHour) {
      ticks.push(i * 60);
      i = i - 1;
    }
    return ticks;
  }

  //Получим ширину графика
  getChartWidth() {
    //Значение ниже определены экпериментальны, исходя из
    // используемой библиотеки recharts и используемого формата данных — «26.03 ЧТ»
    return this.props.statisticByDaysForPeriod.length * 72 + 300;
  }

  getHeight() {
    let hoursCount = this.state.maxHour - this.state.minHour;
    return hoursCount * 20 + 120;
  }

  render() {
    return (
      <div className="chart" style={{ width: this.getChartWidth() }}>
        <div className="chartLable">Время выполнения по дням</div>
        <ReactCustomScroll
          noScrollY={true}
          //Задаем стиль
          style={{
            width: "calc(100vw - 160px)",
            height: this.getHeight() + 26,
            marginRight: "12px"
          }}
        >
          <div className="chartOverLable" style={{ height: this.getHeight() }}>
            {this.getWorkingHours().map(getWorkingHour => {
              return <div className="chartOverLableText">{getWorkingHour}</div>;
            })}
          </div>
          <LineChart
            width={this.getChartWidth()}
            height={this.getHeight() + 24}
            data={this.getData()}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis
              domain={[this.state.minHour * 60, this.state.maxHour * 60]}
              interval={0}
              ticks={this.getTicks()}
            />
          </LineChart>
        </ReactCustomScroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    statisticByDaysForPeriod: state.statisticByDaysForPeriod
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStatisticByDaysForPeriod: (dateFrom, dateTo) => {
      dispatch(fetchStatisticByDaysForPeriod(dateFrom, dateTo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ByDays);
