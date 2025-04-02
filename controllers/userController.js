const mongodb = require("../data/database");
const validation = require("../utilities/validation");
const utilities = require("../utilities/index.js");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("users")
    .find();
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    });
}


const getUser = async (req, res) => {
    const userId = ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db("project2")
        .collection("users")
        .find({ _id: userId });
        response.toArray().then((user) => {
        console.log(response);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user);     
    });
};

const createUser = async (req, res) => {
const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    objectIds: req.body.objectIds,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastContacted: new Date(),
    birthday: req.body.birthday,

};

const response = await mongodb.getDatabase()
    .db("project2")
    .collection("users")
    .insertOne(user);
    console.log(response);
    if (response.insertId) {
        res.status(204).send();
    } else {
        res.status(500).json({error: response.error || "Failed to create user" });
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        objectIds: req.body.objectIds,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastContacted: new Date(),
        birthday: req.body.birthday,
    };

    const response = await mongodb.getDatabase()
        .db("project2")
        .collection("users")
        .replaceOne({ _id: userId }, user );
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({error: response.error || "Failed to update user" });
        }
};

const deleteUser = async (req, res) => {
const userId = new ObjectId(req.params.id);
const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("users")
    .deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({error: response.error || "Failed to delete user" });
    }
}

module.exports = {
    getAll,
    getUser,
    createUser,
    updateUser,
    deleteUser
};