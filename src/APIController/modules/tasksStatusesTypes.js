import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/task_statuses_types";

//Получить все типы статусов задач
export function getAllTaskStatusesTypes() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL, headers).then(response => {
    return response.data;
  });
}
