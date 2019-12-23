const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Activities = require('../models/activities');
const app = express();

app.get('/activities', function(req, res) {
  let from = req.query.from || 0;
  from = Number(from);
  let to = req.query.to || 50;
  to = Number(to);
  Activities.find(null)
    .skip(from)
    .limit(to)
    .exec((err, activities) => {
      if (err) return res.status(400).json({
          ok: false,
          err
      });

      Activities.count({ estado: true }, (err, conteo) => {
          res.json({
              ok: true,
              activities,
              cuantos: conteo
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
          ok: false,
          err
      });
    }
    res.json({
      ok: true,
      activities: activitiesDB
    });
  });
});


module.exports = app;
