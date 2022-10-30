const Demo = require("./model.demo");
const Scores = require("./model.demo");
const mongoose = require("mongoose");

const create = async (req) => {
  console.log(req.body);
  const demo = new Demo(req.body);
  return demo.save();
};
const createbyid = async (req) => {
  const { id } = req.params;
  const { point, date, quarter, sprint } = req.body;
  const score = {
    point: point,
    date: date,
    quarter: quarter,
    sprint: sprint,
  };
  const s = Scores.create(score);

  const demo = await Demo.findOneAndUpdate(
    id,
    { $setOnInsert: s },
    { new: true }
  );
  console.log(demo);
  return demo.save();
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
  console.log(id);
  await Demo.findByIdAndUpdate(id, req.body);
  return Demo.findById(id);
};

const deletes = async (req) => {
  const { id } = req.params;
  return Demo.findByIdAndDelete(id, req.body);
};
module.exports = { create, get, update, deletes, getBy, createbyid };
