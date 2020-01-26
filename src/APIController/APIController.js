const statistics = require("./modules/statistics");

/*
 * Статистика по категория
 */

//Получить статистику по категориям за период
export function getCategoriesStatisticByPeriod(dateFrom, dateTo, callback) {
  statistics.getCategoriesStatisticByPeriod(dateFrom, dateTo, callback);
}

/*
 * Статистика по задачам
 */

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(dateFrom, dateTo, callback) {
  statistics.getTaskStatisticByPeriod(dateFrom, dateTo, callback);
}
