import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash,
    }).save();

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "1h",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "неверный логин или пароль" });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({ message: "неверный логин или пароль" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "1h",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
};
