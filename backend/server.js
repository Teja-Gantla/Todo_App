const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require("./models/todoSchema");
//connect to express
const app = express();

//connect to mongodb database!
const dbURL =
  "mongodb+srv://tejaa:mernpassword@cluster2.gadufkk.mongodb.net/Todo?retryWrites=true&w=majority&appName=Cluster2";

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () =>
      console.log("server is running on port 3001 & mongodb also connected!")
    );
  })
  .catch((err) => {
    console.log("server and mongodb is failed to connect", err);
  });

//Middelware!
app.use(cors());
app.use(bodyParser.json());

//Schema

//Routes
//CRUD =>[ POST // GET // PUT // DELETE ]
//Get tasks
app.get("/tasks", (req, res) => {
  const tasks = Todo.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((err) => {
      res.json({ message: "unable to get tasks" });
    });
});

//Post tasks
app.post("/tasks", (req, res) => {
  const { accomplish } = req.body;
  const task = new Todo({ accomplish });
  task
    .save()
    .then((task) => {
      res.json({ message: "task successfully CREATED!" });
    })
    .catch((error) => {
      res.json({ message: "task failed to created", error });
    });
});

//UPDATE tasks
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { accomplish } = req.body;
  const updatedTask = Todo.findByIdAndUpdate(
    id,
    { accomplish },
    { value: true }
  )
    .then((updatedTask) => {
      res.json({ message: "Task was successfully UPDATED" });
    })
    .catch((err) => {
      res.json({ message: "unable to update task", err });
    });
});

//DELETE a tasks
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { accomplish } = req.body;
  const deleteTask = Todo.findByIdAndDelete(id, { accomplish }, { value: true })
    .then((deleteTask) => {
      res.json({ message: "Task was successfully DELETED" });
    })
    .catch((err) => {
      res.json({ message: "unable to delete task", err });
    });
});
