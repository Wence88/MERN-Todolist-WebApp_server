const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/isAuthenticated");
// register a user
router.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body;
  if (!email || !password) {
    res.status(401).json("Email and Password are requried");
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const findUser = await User.findOne({ email: req.body.email });

    if (findUser) {
      res.status(400).json("User with email exist, please try another one.");
    } else {
      const newUser = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(200).json("Account creation successful.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("User not found");
      return;
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      res.status(401).json("Wrong password");
      return;
    }
    const { _id, email } = user;
    const payload = { _id, email };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(200).json({ authToken: authToken });
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// Get user by email
router.get("/email/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// Update user details
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

module.exports = router;
