const tokens = require("./modules/tokens");
const users = require("./modules/users");
const roles = require("./modules/roles");
const categories = require("./modules/categories");
const statistics = require("./modules/statistics");
const tasks = require("./modules/tasks");
const tasksLog = require("./modules/tasksLog");
const tasksStatuses = require("./modules/tasksStatuses");
const tasksStatusesTypes = require("./modules/tasksStatusesTypes");

/*
 * Токены
 */

//Создание токена
export function getToken(user) {
  return tokens.getToken(user);
}

//Обновить токен
export function reauth(refreshToken) {
  return tokens.reauth(refreshToken);
}

/*
 * Пользователи
 */

//Создать пользователя
export function createUser(user) {
  return users.createUser(user);
}

//Обновить пользователя
export function updateUser(ID, user) {
  return users.updateUser(ID, user);
}

//Получить пользователя как объекта по ID
export function getUserByID(ID) {
  return users.getUserByID(ID);
}

//Получить пользователя как объекта по имени и паролю
export function getUserByEmailPassword(user) {
  return users.getUserByEmailPassword(user);
}

//Получение списка пользователей как объектов в массиве
export function getUsers() {
  return users.getUsers();
}

/*
 * Роли
 */

//Получение списка пользователей
export function getRoles() {
  return roles.getRoles();
}

/*
 * Категории
 */

//Получить все категории пользователя
export function getUserCategories(callback) {
  return categories.getUserCategories(callback);
}

//Получить категорию как объект по ID
export function getCategoryByID(ID, callback) {
  return categories.getCategoryByID(ID, callback);
}

//Создать категорию
export function createCategory(category, callback) {
  return categories.createCategory(category, callback);
}

//Обновить категорию
export function updateCategory(category, callback) {
  return categories.updateCategory(category, callback);
}

//Удалить категорию
export function deleteCategory(ID, callback) {
  return categories.deleteCategory(ID, callback);
}

/*
 * Задачи
 */

//Создать задачу
export function createTask(task) {
  return tasks.createTask(task);
}

//Обновить задачу
export function updateTask(ID, task) {
  return tasks.updateTask(ID, task);
}

//Получить задачу как объект по ID
export function getTaskByID(ID) {
  return tasks.getTaskByID(ID);
}

//Получить все задачи пользователя
export function getUserTasks() {
  return tasks.getUserTasks();
}

//Получить все задачи пользователя за дату
export function getUserTasksByDate(date) {
  return tasks.getUserTasksByDate(date);
}

//Удалить задачу
export function deleteTask(ID) {
  return tasks.deleteTask(ID);
}

/*
 * Лог выполнения задач
 */

//Получить весь лог выполнения всех задач
export function getTasksLog() {
  return tasksLog.getTasksLog();
}

//Получить весь лог выполнения всех задач за день
export function getTasksLogByDate(date) {
  return tasksLog.getTasksLogByDate(date);
}

//Обновить лог по ID
export function updateTaskLog(ID, taskLog) {
  return tasksLog.updateTaskLog(ID, taskLog);
}

//Добавить запись в лог выполнения задач
export function createTaskLog(taskLog) {
  return tasksLog.createTaskLog(taskLog);
}

//Удалить запись из лога выполнения задач
export function deleteTaskLog(ID) {
  return tasksLog.deleteTaskLog(ID);
}

/*
 * Статусы задач
 */

//Получить статус как объект по ID
export function getTaskStatusByID(ID, callback) {
  return tasksStatuses.getTaskStatusByID(ID, callback);
}

//Получить все статусы
export function getAllTaskStatuses(callback) {
  return tasksStatuses.getAllTaskStatuses(callback);
}

//Обновить статус по ID
export function updateStatus(status, callback) {
  return tasksStatuses.updateStatus(status, callback);
}

//Создать статус
export function createStatus(status, callback) {
  return tasksStatuses.createStatus(status, callback);
}

//Удалить статус
export function deleteStatus(ID, callback) {
  return tasksStatuses.deleteStatus(ID, callback);
}

/*
 * Типы статусов задач
 */

export function getAllTaskStatusesTypes(callback) {
  return tasksStatusesTypes.getAllTaskStatusesTypes(callback);
}

/*
 * Статистика по категориям
 */

//Получаем время исполнения по всем категориям
export function getTimeExecutionForAllCategories() {
  return statistics.getTimeExecutionForAllCategories();
}

//Получаем время исполнения по всем категориям за определенный день
export function getTimeExecutionForAllCategoriesByDate(date) {
  return statistics.getTimeExecutionForAllCategoriesByDate(date);
}

/*
 * Статистика по задачам
 */

//Получить статистику по задачам за период
export function getTaskStatisticByPeriod(from, to) {
  return statistics.getTaskStatisticByPeriod(from, to);
}
