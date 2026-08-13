const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const habitsRoutes = require('./routes/habits');
const progressRoutes = require('./routes/progress');
const journalRoutes = require('./routes/journal');
const authRoutes = require('./routes/auth');
const swaggerRoutes = require('./routes/swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/habits', habitsRoutes);
app.use('/progress', progressRoutes);
app.use('/journal', journalRoutes);
app.use('/auth', authRoutes);
app.use('/', swaggerRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Wellness Habit Tracker API is running!'
    });
});

module.exports = app;