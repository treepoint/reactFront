import Axios from "axios";
import { APIURL } from "../Settings";

const tokens = require("./tokens.js");
const URL = APIURL + "/tasks";

//Удалить задачу
export function deleteTask(ID, callback) {
  let headers = tokens.getHeaders();

  if (headers === null) {
    return;
  }

  Axios.delete(URL + "/" + ID, headers)
    .then(response => {
      if (typeof response.data.affectedRows === "number") {
        callback(true);
      }
    })
    .catch(error => {
      callback(false);
    });
}
