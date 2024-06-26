const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  accomplish: String,
});

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;
