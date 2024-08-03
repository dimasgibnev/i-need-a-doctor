import RequestModel from "../models/Request.js";

export const getAll = async (req, res) => {
  try {
    const requests = await RequestModel.find();

    return res.json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось загрузить данные" });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestModel.findOne({ _id: id });

    return res.json(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось загрузить данные" });
  }
};

export const removeOne = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestModel.findOneAndDelete({ _id: id });

    if (!request) {
      console.log(error);
      res.status(500).json({ message: "Заявка не найдена" });
    }

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось загрузить данные" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new RequestModel({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      problem: req.body.problem,
    });

    const newRequest = await doc.save();

    res.json(newRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
};
