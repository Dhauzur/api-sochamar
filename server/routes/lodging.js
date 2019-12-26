const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Lodging = require('../models/lodging');
const app = express();

app.delete('/lodging/delete/all', function(req, res) {
  Lodging.deleteMany({}, function (err, lodging) {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      deleteAll: true,
      deletedCount: lodging.deletedCount,
    });
  });
});

app.get('/lodgings', function(req, res) {
  let from = req.query.from || 0;
  from = Number(from);
  let to = req.query.to || 50;
  to = Number(to);
  Lodging.find(null)
    .skip(from)
    .limit(to)
    .exec((err, lodgings) => {
      if (err) return res.status(400).json({ ok: false, err });
      Lodging.count({}, (err, length) => {
        res.json({
            status: true,
            lodgings,
            length
        });
      });
    });
});

app.post('/lodging/create', function(req, res) {
  let body = req.body;
  let lodging = new Lodging({
      id: body.id,
      idGroup: body.idGroup,
      start: body.start,
      end: body.end,
      content: body.idGroup + ' Hab.' ,
      numberPassanger: body.numberPassanger,
      typePension: body.typePension
  });
  lodging.save((err, lodgingDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      status: true,
      lodging: lodgingDB
    });
  });
});

module.exports = app;
