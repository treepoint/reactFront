import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { CLEAR_STATE } from "../actions/app";

import { scrollTop, scrollLeft } from "./page";
import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token } from "./token";

import {
  userAuthState,
  authError,
  showBroadcastMessage,
  showHeaderWarning,
  windowHeight,
  windowWidth,
  title,
  nextDayAlreadyComesMessageShowDate,
} from "./app";

import {
  currentUser,
  currentUserIsAdmin,
  registrationError,
  updateProfileError
} from "./currentUser";

import { categories, categoriesIsUpdating } from "./categories";

import { projects, projectsIsUpdating } from "./projects";

import { users, usersIsUpdating } from "./users";

import { userRoles } from "./userRoles";

import { tasks, tasksIsFetching, tasksIsUpdating } from "./tasks";

import { tasksLog, tasksLogIsUpdating } from "./tasksLog";

import { userSettings } from "./userSettings";

import { notifications } from "./notifications";

import {
  categoriesStatisticByPeriod,
  tasksStatisticByPeriod,
  totalStatisticByPeriod,
  statisticByDaysForPeriod,
  activeTasksCountByCategories
} from "./statistics";

const appReducer = history =>
  combineReducers({
    router: connectRouter(history),
    //app
    userAuthState,
    authError,
    showBroadcastMessage,
    showHeaderWarning,
    windowHeight,
    windowWidth,
    title,
    nextDayAlreadyComesMessageShowDate,
    //Page
    scrollTop,
    scrollLeft,
    //globalModalWindow
    modalWindowState,
    modalWindowName,
    //token
    token,
    //currentUser
    currentUser,
    updateProfileError,
    registrationError,
    currentUserIsAdmin,
    //userRoles
    userRoles,
    //categories
    categories,
    categoriesIsUpdating,
    //projects
    projects,
    projectsIsUpdating,
    //users
    users,
    usersIsUpdating,
    //tasks
    tasks,
    tasksIsFetching,
    tasksIsUpdating,
    //tasksLog
    tasksLog,
    tasksLogIsUpdating,
    //settings
    userSettings,
    //notifications
    notifications,
    //statistic
    categoriesStatisticByPeriod,
    tasksStatisticByPeriod,
    totalStatisticByPeriod,
    statisticByDaysForPeriod,
    activeTasksCountByCategories
  });

const rootReducer = history => (state, action) => {
  //Очистим все данные в сторе
  if (action.type === CLEAR_STATE) state = undefined;

  return appReducer(history)(state, action);
};

export default rootReducer;
