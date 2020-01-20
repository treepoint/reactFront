import { combineReducers } from "redux";

import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token, authError } from "./token";
import { user, clearUser, userUpdateError } from "./user";
import { scrollTop, scrollLeft } from "./page";

export default combineReducers({
  token,
  authError,
  user,
  userUpdateError,
  clearUser,
  modalWindowState,
  modalWindowName,
  scrollTop,
  scrollLeft
});
