const mongodb = require("../data/database");
const validation = require("../utilities/validation");
const utilities = require("../utilities/index.js");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("objects")
    .find();
    response.toArray().then((object) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(object);
    });
}

const getObject = async (req, res) => {
    const objectId = ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db("project2")
        .collection("objects")
        .find({ _id: objectId });
        response.toArray().then((object) => {
        console.log(object);
        console.log(response);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(object);     
    });
};

const createObject = async (req, res) => {
const  object = {
    name: req.body.name,
    type: req.body.type,
    height: req.body.height,
    width: req.body.width,
    weight: req.body.weight,
    color: req.body.color,
    material: req.body.material,
    origin: req.body.origin,
    description: req.body.description,
    createdAt: new Date(),
    updatedAt: new Date()
};

const response = await mongodb.getDatabase()
    .db("project2")
    .collection("objects")
    .insertOne(object);
    console.log(response);

    if (response.insertId) {
        res.status(204).send();
    } else {
        res.status(500).json({error: response.error || "Failed to create object" });
    }

};

const updateObject = async (req, res) => {

    const objectId = new ObjectId(req.params.id);
    const object = {
        name: req.body.name,
        type: req.body.type,
        height: req.body.height,
        width: req.body.width,
        weight: req.body.weight,
        color: req.body.color,
        material: req.body.material,
        origin: req.body.origin,
        description: req.body.description,
        // createdAt: req.body.createdAt,
        updatedAt: new Date()
    };

    const response = await mongodb.getDatabase()
        .db("project2")
        .collection("objects")
        .replaceOne({ _id: objectId }, object );
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({error: response.error || "Failed to update object" });
        }
};

const deleteObject = async (req, res) => {
const objectId = new ObjectId(req.params.id);
const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("objects")
    .deleteOne({ _id: objectId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({error: response.error || "Failed to delete object" });
    }
}

module.exports = {
    getAll,
    getObject,
    createObject,
    updateObject,
    deleteObject,
};