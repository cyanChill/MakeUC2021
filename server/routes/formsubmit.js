const express = require("express");

// eventRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const eventRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
eventRoutes.route("/events").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("events")
    .find({})
    .sort({ submitDate: -1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a list of all the records.
eventRoutes.route("/userevents/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("events")
    .find({ submitterId: req.params.id })
    .sort({ submitDate: -1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
eventRoutes.route("/event/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { eventId: req.params.id };
  db_connect.collection("events").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new record.
eventRoutes.route("/form/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(req.body);
  let myobj = {
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    locationSetting: req.body.locationSetting,
    location: req.body.location,
    masks: req.body.masks,
    submitterId: req.body.submitterId,
    submitDate: req.body.submitDate,
    eventId: req.body.eventId,
    organizerName: req.body.organizerName,
  };
  db_connect.collection("events").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
eventRoutes.route("/form/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { eventId: req.params.id };
  let newvalues = {
    $set: {
      eventName: req.body.eventName,
      eventDescription: req.body.eventDescription,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      locationSetting: req.body.locationSetting,
      location: req.body.location,
      masks: req.body.masks,
      submitDate: req.body.submitDate,
    },
  };
  db_connect.collection("events").updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
    response.json(res);
  });
});

module.exports = eventRoutes;
