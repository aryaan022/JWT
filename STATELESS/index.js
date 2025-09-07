import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

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