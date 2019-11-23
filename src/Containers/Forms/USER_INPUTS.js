import { numReg, charReg, emailReg } from "./REGULAR_EXP";

//Пользовательские поля
export const email = {
  name: "email",
  type: "text",
  placeholder: "Email",
  validationFunctions: [
    {
      getInvalidMessage: value => (!!value ? "" : "Email должен быть заполнен")
    },
    {
      getInvalidMessage: value =>
        emailReg.test(value) ? "" : "Введите корректный email"
    }
  ],
  defaultValue: ""
};

export const password = {
  name: "password",
  type: "password",
  placeholder: "Пароль",
  validationFunctions: [
    {
      getInvalidMessage: value => (!!value ? "" : "Пароль должен быть заполнен")
    }
  ],
  defaultValue: ""
};
