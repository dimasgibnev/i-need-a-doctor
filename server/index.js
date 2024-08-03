import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  loginValidation,
  registerValidation,
  RequestValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, RequestController } from "./controllers/index.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post(
  "/auth/signIn",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/auth/signUp",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/requests",
  RequestValidation,
  handleValidationErrors,
  RequestController.create
);
app.get("/requests", checkAuth, RequestController.getAll);
app.get("/requests/:id", checkAuth, RequestController.getOne);

mongoose
  .connect(
    "mongodb+srv://dimasgibnev:570KE4Zso0oYm5WY@cluster0.saxptyr.mongodb.net/i_need_a_doctor?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, (e) => {
      if (e) {
        console.error(e, "Ошибка сервера");
      }
      console.log(`app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err, "db connection error"));
