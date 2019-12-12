/* Немного переделанный код отсюда https://github.com/15Dkatz/sfcookies
 * Спасибо 15Dkatz!
 */

export function bake_cookie(name, value, date) {
  let expirey = date instanceof Date ? " expires=" + date : null;

  var cookie = [
    name,
    "=",
    JSON.stringify(value),
    "; domain_.",
    window.location.host.toString(),
    "; path=/;",
    expirey
  ].join("");

  document.cookie = cookie;
}

export function read_cookie(name) {
  var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  result = result != null ? JSON.parse(result[2]) : [];
  return result;
}

export function delete_cookie(name) {
  document.cookie = [
    name,
    "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain.",
    window.location.host.toString()
  ].join("");
}
