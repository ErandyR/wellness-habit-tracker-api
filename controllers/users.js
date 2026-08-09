const { ObjectId } = require('mongodb');
const { getDB } = require('../db/connect');

const createUser = async (req, res) => {
    try {
        const { name, email, age, gender, weight, height } = req.body;

        if (!name || !email || !age || !gender || !weight || !height) {
            return res.status(400).json({
                message: 'All user fields are required.'
            });
        }

        const newUser = {
            name,
            email,
            age,
            gender,
            weight,
            height,
            createdAt: new Date()
        };

        const db = getDB();

        const result = await db.collection('users').insertOne(newUser);

        res.status(201).json({
            message: 'User created successfully.',
            userId: result.insertedId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while creating the user.'
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const db = getDB();

        const users = await db.collection('users').find().toArray();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving users.'
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        const db = getDB();

        const user = await db.collection('users').findOne({
            _id: new ObjectId(id)
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while retrieving the user.'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age, gender, weight, height } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        if (!name || !email || !age || !gender || !weight || !height) {
            return res.status(400).json({
                message: 'All user fields are required.'
            });
        }

        const updatedUser = {
            name,
            email,
            age,
            gender,
            weight,
            height
        };

        const db = getDB();

        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedUser }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User updated successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while updating the user.'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }

        const db = getDB();

        const result = await db.collection('users').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully.'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'An error occurred while deleting the user.'
        });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};