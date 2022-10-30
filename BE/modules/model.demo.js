const mongoose = require("mongoose");

const ScoresSchema = new mongoose.Schema({
  point: { type: Number },
  date: { type: Date, default: Date.now() },
  quarter: { type: Number },
  sprint: { type: Number },
});

const DemoSchema = new mongoose.Schema(
  {
    name: { type: String,  trim: true },
    description: { type: String,  trim: true },
    color: { type: String, trim: true },
    scores: [ScoresSchema],
  },
  { timestamps: true }
);
const Scores = mongoose.model("Score",ScoresSchema)

const Demo = mongoose.model("Demo", DemoSchema);
module.exports = Demo,Scores;
