const router = require("express").Router();
const Todo = require("../models/Todo");

// create a todo task
router.post("/create", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);

    await newTodo.save();

    res.status(200).json("Todo created!");
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// get single todo
router.get("/single-todo/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json("Todo not found!");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});
1;
2;

// get all todos by a user
router.get("/:id", async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.params.id });

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      await Todo.findByIdAndUpdate(req.params.id, {
        $set: req.body,
        new: true,
      });

      res.status(200).json("Todo updated!");
    } else {
      res.status(404).json("Todo not found!");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      await Todo.findByIdAndDelete(req.params.id);

      res.status(200).json("Todo deleted successfully!");
    } else {
      res.status(404).json("Todo not found!");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

module.exports = router;
