import User from "../models/User.js";
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
  try {
    const {email } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ success: false, message: "Email already registered" });

    const user = new User({ ...req.body });
    await user.save();

    res.status(201).json({ success: true, message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) 
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id },
      "qawsedrf-edwsqaws-wsqaedws-wswswsws",
      { expiresIn: "10h" } // optional: use readable time format
    );
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

      