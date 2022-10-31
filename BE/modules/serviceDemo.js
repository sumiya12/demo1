const Demo = require("./model.demo");
const Scores = require("./model.demo");
const mongoose = require("mongoose");

const create = async (req) => {
  const demo = new Demo(req.body);
  return demo.save();
};
const createbyid = async (req) => {
  const { id } = req.params;
  const { point, date, quarter, sprint } = req.body;
  const scores = {
    point: point,
    date: date,
    quarter: quarter,
    sprint: sprint,
  };
  await Demo.updateOne({ _id: id }, { $push: { scores: scores } });

  return Demo.findById(id);
};

const get = async (req) => {
  return Demo.find();
};

const getBy = async (req) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) return Demo.findById(id);
};

const update = async (req) => {
  const { id } = req.query;

  await Demo.findByIdAndUpdate(id, req.body);
  return Demo.findById(id);
};

const deletes = async (req) => {
  const { id } = req.params;
  return Demo.findByIdAndDelete(id, req.body);
};
module.exports = { create, get, update, deletes, getBy, createbyid };
