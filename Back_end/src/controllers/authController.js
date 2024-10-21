import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const userDB = await User.findOne({ $or: [{ username }, { email }] });
    
        if (userDB) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // hashing password and salting
        const passwordHashing = await bcrypt.hash(password, 10);
    
        const user = new User({
          username,
          password: passwordHashing,
          email,
        });
    
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully", token });
      } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
      }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "Password or email is incorrect" });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(400).json({ message: "Password or email is incorrect" });
        }
    
        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
      }
}

// Add a default export object containing both functions
export default {
  register,
  login
};
