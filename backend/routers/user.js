import express from "express";
import userSchema from "../models/user.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await userSchema.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", registered: false });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.status(200).json({ message: user, registered: true });
    } else {
      res.status(401).json({ message: "Invalid password", registered: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new userSchema({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
