import { combineReducers } from "redux";

import { CLEAR_STATE } from "../actions/app";
import { userAuthState, authError } from "./app";
import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token } from "./token";

import {
  currentUser,
  currentUserIsAdmin,
  registrationError,
  updateProfileError
} from "./currentUser";

import { userRoles } from "./userRoles";
import { scrollTop, scrollLeft } from "./page";
import { taskStatusesTypes } from "./taskStatusesTypes";

import {
  taskStatuses,
  taskStatusIsUpdating,
  taskStatusUpdateError,
  taskStatusCreateError
} from "./taskStatuses";

import {
  categories,
  categoriesIsUpdating,
  categoryUpdateError,
  categoryCreateError
} from "./categories";

import {
  users,
  usersIsUpdating,
  userUpdateError,
  userDeleteError
} from "./users";

import {
  tasks,
  tasksIsUpdating,
  taskUpdateError,
  taskDeleteError
} from "./tasks";

const appReducer = combineReducers({
  //app
  userAuthState,
  authError,
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
  //taskStatusesTypes
  taskStatusesTypes,
  //taskStatuses
  taskStatuses,
  taskStatusIsUpdating,
  taskStatusUpdateError,
  taskStatusCreateError,
  //categories
  categories,
  categoriesIsUpdating,
  categoryUpdateError,
  categoryCreateError,
  //users
  users,
  usersIsUpdating,
  userUpdateError,
  userDeleteError,
  //tasks
  tasks,
  tasksIsUpdating,
  taskUpdateError,
  taskDeleteError
});

const rootReducer = (state, action) => {
  //Очистим все данные в сторе
  if (action.type === CLEAR_STATE) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
