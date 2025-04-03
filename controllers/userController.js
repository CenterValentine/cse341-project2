const mongodb = require("../models/data/database.js");
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
};

const getUser = async (req, res) => {
  try {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("users")
    .find({ _id: userId });

    const userArray = await response.toArray();

  if (userArray.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = userArray[0];
  console.log(user);
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(user);
  } catch (error) {
  console.error("Error fetching user:", error);
  res.status(500).json({ error: "Failed to fetch user" });
};
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    objectIds: req.body.objectIds || [],
    createdAt: new Date(),
    updatedAt: new Date(),
    lastContacted: new Date(),
    birthday: req.body.birthday,
  };

  const existingUser = await mongodb
    .getDatabase()
    .db("project2")
    .collection("users")
    .findOne({ email: user.email });

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("users")
    .insertOne(user);
  console.log(response);
  if (response.acknowledged) {
    res.status(201).json({"response": "User created",
      ObjectId: response.insertedId});
  } else {
    console.log('model response:', response);
    res.status(500).json({ error: response.error || "Failed to create user" });
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    objectIds: req.body.objectIds,
    // createdAt: req.body.createdAt,
    updatedAt: new Date(),
    lastContacted: req.body.lastContacted,
    birthday: req.body.birthday,
  };

  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(202).send("User updated");
  } else {
    res.status(500).json({ error: response.error || "Failed to update user" });
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
    res.status(200).send("User deleted");
  } else {
    res.status(500).json({ error: response.error || "Failed to delete user" });
  }
};

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
