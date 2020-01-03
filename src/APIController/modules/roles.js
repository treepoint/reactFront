import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/roles";

//Получение списка пользователей как объектов в массиве
export function getRoles() {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  return Axios.get(URL, headers).then(response => {
    return response.data;
  });
}
