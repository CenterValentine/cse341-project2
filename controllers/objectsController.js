const mongodb = require("../models/data/database.js");
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
    const objectId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db("project2")
        .collection("objects")
        .find({ _id: objectId });

        const objectArray = await response.toArray();

        if (objectArray.length === 0) {
            return res.status(404).json({ error: "Object not found" });
        }

        const object = objectArray[0];
        console.log(object);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(object);

};

const createObject = async (req, res) => {
const  object = {
    name: req.body.name,
    shape: req.body.shape,
    height: req.body.height,
    width: req.body.width,
    unit: req.body.unit,
    color: req.body.color,
    origin: req.body.origin,
    description: req.body.description,
    createdAt: new Date(),
    updatedAt: new Date()
};


  const existingObject = await mongodb
    .getDatabase()
    .db("project2")
    .collection("objects")
    .findOne({ name: object.name });
  if (existingObject) {
    return res.status(409).json({ error:`Object with ${object.name} already exists` });
  }

const response = await mongodb.getDatabase()
    .db("project2")
    .collection("objects")
    .insertOne(object);
    console.log(response);
    if (response.acknowledged) {
        res.status(201).json({"response": "Object created",
            ObjectId: response.insertedId});
     } else {
        res.status(500).json({error: response.error || "Failed to create object" });
    }

};

const updateObject = async (req, res) => {

    const objectId = new ObjectId(req.params.id);
    const object = {
        name: req.body.name,
        shape: req.body.shape,
        height: req.body.height,
        width: req.body.width,
        unit: req.body.unit,
        color: req.body.color,
        origin: req.body.origin,
        description: req.body.description,
        // createdAt: req.body.createdAt,
        updatedAt: new Date()
    };



  const existingObject = await mongodb
  .getDatabase()
  .db("project2")
  .collection("objects")
  .findOne({ name: object.name });
if (existingObject) {
  return res.status(409).json({ error: `Object with ${object.name} already exists` });
}

    const response = await mongodb.getDatabase()
        .db("project2")
        .collection("objects")
        .replaceOne({ _id: objectId }, object );
        if (response.modifiedCount > 0) {
            console.log(response);
            res.status(202).send("object updated");
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
        res.status(201).send("Object deleted");
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