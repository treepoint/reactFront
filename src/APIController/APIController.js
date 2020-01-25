const statistics = require("./modules/statistics");
const tasks = require("./modules/tasks");
const tasksLog = require("./modules/tasksLog");

/*
 * Задачи
 */

//Получить задачу как объект по ID
export function getTaskByID(ID, callback) {
  tasks.getTaskByID(ID, callback);
}

//Получить все задачи пользователя
export function getUserTasks(callback) {
  tasks.getUserTasks(callback);
}

//Получить все задачи пользователя за дату
export function getUserTasksByDate(date, callback) {
  tasks.getUserTasksByDate(date, callback);
}

//Создать задачу
export function createTask(task, callback) {
  tasks.createTask(task, callback);
}

//Обновить задачу
export function updateTask(task, callback) {
  tasks.updateTask(task, callback);
}

//Удалить задачу
export function deleteTask(ID, callback) {
  tasks.deleteTask(ID, callback);
}

/*
 * Лог выполнения задач
 */

//Получить весь лог выполнения всех задач
export function getTasksLog(callback) {
  tasksLog.getTasksLog(callback);
}

//Получить весь лог выполнения всех задач за день
export function getTasksLogByDate(date, callback) {
  tasksLog.getTasksLogByDate(date, callback);
}

//Обновить лог по ID
export function updateTaskLog(taskLog, callback) {
  tasksLog.updateTaskLog(taskLog, callback);
}

//Добавить запись в лог выполнения задач
export function createTaskLog(taskLog, callback) {
  tasksLog.createTaskLog(taskLog, callback);
}

//Удалить запись из лога выполнения задач
export function deleteTaskLog(ID, callback) {
  tasksLog.deleteTaskLog(ID, callback);
}

/*
 * Статистика по категориям
 */

//Получаем время исполнения по всем категориям
export function getTimeExecutionForAllCategories(callback) {
  statistics.getTimeExecutionForAllCategories(callback);
}

//Получаем время исполнения по всем категориям за определенный день
export function getTimeExecutionForAllCategoriesByDate(date, callback) {
  statistics.getTimeExecutionForAllCategoriesByDate(date, callback);
}

/*
 * Статистика по задачам
 */

//Получить статистику по категориям за период
export function getCategoriesStatisticByPeriod(dateFrom, dateTo, callback) {
  statistics.getCategoriesStatisticByPeriod(dateFrom, dateTo, callback);
}

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(dateFrom, dateTo, callback) {
  statistics.getTaskStatisticByPeriod(dateFrom, dateTo, callback);
}
