const express = require('express');
const router = express.Router();
const { authenticationToken } = require('../middleware/auth.js');




router.get('/', authenticationToken,(req, res) => {
    res.status(200).json({ message: 'Welcome to the private route!' });
});





module.exports = router;