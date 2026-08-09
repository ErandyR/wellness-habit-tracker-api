const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect');

const createHabit = async (req, res) => {
    try {
        const {
            title,
            description,
            frequency,
            category,
            completed,
            userId
        } = req.body;

        if (
            !title ||
            !description ||
            !frequency ||
            !category ||
            completed === undefined ||
            !userId
        ) {
            return res.status(400).json({
                message: 'All habit fields are required.'
            });
        }

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        const db = getDB();

        const user = await db.collection('users').findOne({
            _id: new ObjectId(userId)
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const newHabit = {
            title,
            description,
            frequency,
            category,
            completed,
            userId: new ObjectId(userId),
            createdAt: new Date()
        };

        const result = await db.collection('habits').insertOne(newHabit);

        res.status(201).json({
            message: 'Habit created successfully.',
            habitId: result.insertedId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while creating the habit.'
        });
    }
};

const getHabits = async (req, res) => {
    try {
        const db = getDB();

        const habits = await db.collection('habits').find().toArray();

        res.status(200).json(habits);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving habits.'
        });
    }
};

const getHabitById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid habit ID.'
            });
        }

        const db = getDB();

        const habit = await db.collection('habits').findOne({
            _id: new ObjectId(id)
        });

        if (!habit) {
            return res.status(404).json({
                message: 'Habit not found.'
            });
        }

        res.status(200).json(habit);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving the habit.'
        });
    }
};

const updateHabit = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            frequency,
            category,
            completed,
            userId
        } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid habit ID.'
            });
        }

        if (
            !title ||
            !description ||
            !frequency ||
            !category ||
            completed === undefined ||
            !userId
        ) {
            return res.status(400).json({
                message: 'All habit fields are required.'
            });
        }

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        const db = getDB();

        const user = await db.collection('users').findOne({
            _id: new ObjectId(userId)
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        const updatedHabit = {
            title,
            description,
            frequency,
            category,
            completed,
            userId: new ObjectId(userId)
        };

        const result = await db.collection('habits').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedHabit }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Habit not found.'
            });
        }

        res.status(200).json({
            message: 'Habit updated successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while updating the habit.'
        });
    }
};

const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid habit ID.'
            });
        }

        const db = getDB();

        const result = await db.collection('habits').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Habit not found.'
            });
        }

        res.status(200).json({
            message: 'Habit deleted successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while deleting the habit.'
        });
    }
};

module.exports = {
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    deleteHabit
};