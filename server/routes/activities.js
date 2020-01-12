const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Activities = require('../models/activities');
const app = express();

app.get('/activities', function(req, res) {
  Activities.find(null)
    .exec((err, activities) => {
      if (err) return res.status(400).json({
          status: false,
          err
      });

      Activities.count(null, (err, length) => {
          res.json({
              status: true,
              activities: activities.reverse(),
              length
          });
      });
    });
});

app.post('/activities/create', function(req, res) {
  let body = req.body;
  let activities = new Activities({
      workPlace: body.workPlace,
      whatWasDone: body.whatWasDone,
      ncamas: body.ncamas,
      date: body.date
  });
  activities.save((err, activitiesDB) => {
    if (err) {
      return res.status(400).json({
          status: false,
          err
      });
    }
    res.json({
      status: true,
      activities: activitiesDB
    });
  });
});


app.delete('/activities/delete/all', function(req, res) {
  Activities.deleteMany({}, function (err, activities) {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      deleteAll: true,
      deletedCount: activities.deletedCount,
    });
  });
});

module.exports = app;
