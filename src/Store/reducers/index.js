import { combineReducers } from "redux";

import { modalWindowState, modalWindowName } from "./globalModalWindow";
import { token } from "./token";
import { user } from "./user";
import { scrollTop, scrollLeft } from "./page";

export default combineReducers({
  token,
  user,
  modalWindowState,
  modalWindowName,
  scrollTop,
  scrollLeft
});
