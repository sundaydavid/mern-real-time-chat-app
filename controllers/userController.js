const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const validtor = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (user)
      return res.status(400).json("User already exist with the email: ", email);
    if (!name || !email || !password)
      return res.status(400).json("All fields are required");
    if (!validtor.isEmail(email))
      return res
        .status(400)
        .json("Invalid Email address. please add a valid email");
    if (!validtor.isStrongPassword(password))
      return res
        .status(400)
        .json("Password too weak. please supply a strong password");

    user = new UserModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json("Password doesnt match");

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, username: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
    
        res.status(200).json(users);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
};

module.exports = { registerUser, loginUser, findUser, findAllUsers };
