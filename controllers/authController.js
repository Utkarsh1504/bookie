import * as z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const validateSignup = (obj) => {
  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const response = schema.safeParse(obj);
  return response;
};

const validateLogin = (obj) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const response = schema.safeParse(obj);
  return response;
};

export const signupController = async (req, res) => {
  try {
    const validate = validateSignup(req.body);
    if (!validate.success) {
      res.status(400).json({ message: "invalid input", err: validate.error });
      return;
    }
    const { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({
      message: "user created",
      name: newUser.name,
      email: newUser.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const validate = validateLogin(req.body);
    if (!validate.success) {
      res.status(400).json({ message: "invalid input", err: validate.error });
      return;
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "wrong password" });
      return;
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({
        message: "login successful",
        name: user.name,
        email: user.email,
        token: token,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
