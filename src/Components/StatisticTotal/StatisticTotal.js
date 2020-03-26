import React from "react";
//CSS
import "./StatisticTotal.css";

class StatisticTotal extends React.PureComponent {
  render() {
    return (
      <div className="statisticTotal">
        <div className="statisticTotalLable">Итого: </div>
        {this.props.totalValue}
      </div>
    );
  }
}

export default StatisticTotal;
