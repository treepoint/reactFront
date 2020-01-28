import { combineReducers } from "redux";

import { CLEAR_STATE } from "../actions/app";

import { scrollTop, scrollLeft } from "./page";
import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token } from "./token";

import {
  userAuthState,
  authError,
  showBroadcastMessage,
  showHeaderWarning
} from "./app";

import {
  currentUser,
  currentUserIsAdmin,
  registrationError,
  updateProfileError
} from "./currentUser";

import {
  taskStatuses,
  taskStatusIsUpdating,
  taskStatusUpdateError,
  taskStatusCreateError
} from "./taskStatuses";

import { taskStatusesTypes } from "./taskStatusesTypes";

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

import { userRoles } from "./userRoles";

import {
  tasks,
  tasksIsUpdating,
  taskUpdateError,
  taskDeleteError
} from "./tasks";

import {
  tasksLog,
  tasksLogIsUpdating,
  taskLogUpdateError,
  taskLogDeleteError
} from "./tasksLog";

const appReducer = combineReducers({
  //app
  userAuthState,
  authError,
  showBroadcastMessage,
  showHeaderWarning,
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
  taskDeleteError,
  //tasksLog
  tasksLog,
  tasksLogIsUpdating,
  taskLogUpdateError,
  taskLogDeleteError
});

const rootReducer = (state, action) => {
  //Очистим все данные в сторе
  if (action.type === CLEAR_STATE) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
