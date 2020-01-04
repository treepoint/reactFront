import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/roles";

//Получение списка пользователей как объектов в массиве
export function getRoles(callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.get(URL, headers).then(response => {
    callback(response.data);
  });
}
