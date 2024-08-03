import { body } from "express-validator";

export const registerValidation = [
  body("email", "Некорректный адрес электронной почты").isEmail(),
  body("password", "Пароль должен быть больше 5 символов").isLength({ min: 5 }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
];

export const loginValidation = [
  body("email", "Некорректный адрес электронной почты").isEmail(),
  body("password", "Пароль должен быть больше 5 символов").isLength({ min: 5 }),
];

export const RequestValidation = [
  body("fullName", "Введите полное имя").isLength({ min: 3 }).isString(),
  body("phoneNumber", "Введите корректный номер телефона")
    .isLength({ min: 10 })
    .isNumeric(),
  body("problem", "Опишите проблему").isLength({ min: 3 }).isString(),
];
