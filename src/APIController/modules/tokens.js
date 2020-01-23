import { read_cookie } from "../../Libs/Sfcookies";

//Получим заголовки !!Как только все API переедет в redux — это надо будет удалить
export function getHeaders() {
  let token = read_cookie("token");

  if (token.length === 0) {
    return null;
  }

  return {
    headers: {
      Authorization: "Bearer " + read_cookie("token")
    }
  };
}
