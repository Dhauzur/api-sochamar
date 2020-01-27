const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Report = require('../models/reports');
const app = express();

app.get('/reports', function(req, res) {
  Report.find(null)
    .exec((err, reports) => {
      if (err) return res.status(400).json({
          status: false,
          err
      });

      Report.count(null, (err, length) => {
          res.json({
              status: true,
              reports: reports.reverse(),
              length
          });
      });
    });
});

app.post('/reports/create', function(req, res) {
  let body = req.body;
  let reports = new Report({
      member: body.member,
      whatWasDone: body.whatWasDone,
  });
  reports.save((err, reportsDB) => {
    if (err) {
      return res.status(400).json({
          status: false,
          err
      });
    }
    res.json({
      status: true,
      reports: reportsDB
    });
  });
});


app.delete('/reports/delete/all', function(req, res) {
  Report.deleteMany({}, function (err, reports) {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      deleteAll: true,
      deletedCount: reports.deletedCount,
    });
  });
});

module.exports = app;
