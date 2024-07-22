const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const friendRoutes = require('./routes/friendRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

app.use((err, req, res, next) => {
   console.error('Express error handler:', err.stack);
   res.status(500).json({error: 'Something went wrong!'});
});

module.exports = app;