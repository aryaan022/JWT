const express = require('express');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const router = express.Router();




router.post("/signup", async(req, res) => {
    // Handle user signup
    const { username, password } = req.body;

    try{
        const existingUser = await User.findOne({ username});
        if(existingUser){
            return res.status(400).json({ message: "Username already exists"});
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully"});
    }catch(err){
        console.error("Error during signup:", err);
        res.status(500).json({ message: "Internal server error" });
    }

});

router.post("/login", async(req, res) => {

    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({userId :user._id, username:user.username},process.env.JWT_secret, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    }catch(err){
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}); 

module.exports = router;