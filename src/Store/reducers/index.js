import { combineReducers } from "redux";

import { userAuthState, authError } from "./app";
import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token } from "./token";
import { user, userUpdateError, userCreateError, UserIsAdmin } from "./user";
import { scrollTop, scrollLeft } from "./page";

export default combineReducers({
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
  UserIsAdmin
});
