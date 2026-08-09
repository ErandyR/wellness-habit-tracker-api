const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const habitsRoutes = require('./routes/habits');
const swaggerRoutes = require('./routes/swagger');

const { connectDB } = require('./db/connect');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/habits', habitsRoutes);
app.use('/', swaggerRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Wellness Habit Tracker API is running!'
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();