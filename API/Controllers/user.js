import User from "../Models/User.js"; // Import User correctly
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = await User.create({ name, email, password: hashedPassword });
    return res.json({ message: "User registered successfully", user, success: true });
  } catch (error) {
    // Handle errors
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// User login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "!@#$%^&*()+*/", {
      expiresIn: "365d",
    });

    // Send response with token and user details
    return res.json({ message: `Welcome ${user.name}`, token, success: true });
  } catch (error) {
    // Handle errors
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Get all users
export const users = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get user profile
export const profile = async (req, res) => {
  try {
    return res.json({ user: req.user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
