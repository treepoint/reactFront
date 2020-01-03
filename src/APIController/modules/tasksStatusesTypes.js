import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/task_statuses_types";

//Получить все типы статусов задач
export function getAllTaskStatusesTypes(callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL, headers).then(response => {
    callback(response.data);
  });
}
