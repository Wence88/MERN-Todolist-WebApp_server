const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String },
    cat: { type: String },
    desc: { type: String },
    expire: { type: Date },
    user: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
