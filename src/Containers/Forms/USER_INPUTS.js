import { emailReg } from "../../Libs/RegularExpressions";

//Поля для «пользовательских»  форм
export const email = {
  name: "email",
  type: "text",
  label: "Email",
  placeholder: "Введите ваш email",
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
  label: "Пароль",
  placeholder: "Укажите пароль",
  validationFunctions: [
    {
      getInvalidMessage: value => (!!value ? "" : "Пароль должен быть заполнен")
    }
  ],
  defaultValue: ""
};
