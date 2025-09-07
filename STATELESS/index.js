const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authroutes.js');
const privateRoutes = require('./routes/privateroutes.js');
const User = require('./models/user.js');

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());




app.use("/auth", authRoutes);
app.use("/private", privateRoutes);

// MongoDB connection

mongoose.connect('mongodb://localhost:27017/jw_token')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});



 
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});