const router = require("express").Router();
const User = require("../model/User");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Reject photo
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    file.originalname = "default.png";
    cb(null, true);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const {
  registerValidation,
  loginValidation,
  editValidation,
} = require("../config/config");
const Joi = require("joi");
const path = require("path");

// REGISTER
router.post("/register", upload.single("profileImage"), async (req, res) => {
  console.log(req.file);
  // Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is duplicate
  const emailUsed = await User.findOne({ email: req.body.email });
  if (emailUsed) return res.status(400).send("Email already used");

  // Hash the password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    // password: hashedPassword,
    password: req.body.password,
    picture: req.file.path,
    date: req.body.date,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
    // res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is wrong");

  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  const validPassword = await User.findOne({ password: req.body.password });
  if (!validPassword) return res.status(400).send("Wrong password");

  // Create & Assign token
  const token = jwt.sign(
    {
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      phoneNumber: user.phone,
      password: user.password,
      picture: user.picture,
      date: user.date,
    },
    process.env.TOKEN
  );
  res.header("authentication-token", token).send(token);
});

// EDIT
router.patch("/edit", async (req, res) => {
  // Validate the data
  const { error } = editValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is wrong");
  // const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if (!validPassword) return res.status(400).send("Wrong password");

  // Change the data
  try {
    Object.assign(user, req.body);

    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
