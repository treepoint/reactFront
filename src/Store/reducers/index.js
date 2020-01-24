import { combineReducers } from "redux";

import { CLEAR_STATE } from "../actions/app";
import { userAuthState, authError } from "./app";
import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token } from "./token";
import { user, userUpdateError, userCreateError, UserIsAdmin } from "./user";
import { userRoles } from "./userRoles";
import { scrollTop, scrollLeft } from "./page";
import { taskStatusesTypes } from "./taskStatusesTypes";
import {
  taskStatuses,
  taskStatusIsUpdating,
  taskStatusUpdateError,
  taskStatusCreateError
} from "./taskStatuses";

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
  //user
  user,
  userUpdateError,
  userCreateError,
  UserIsAdmin,
  //userRoles
  userRoles,
  //taskStatusesTypes
  taskStatusesTypes,
  //taskStatuses
  taskStatuses,
  taskStatusIsUpdating,
  taskStatusUpdateError,
  taskStatusCreateError
});

const rootReducer = (state, action) => {
  //Очистим все данные в сторе
  if (action.type === CLEAR_STATE) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
