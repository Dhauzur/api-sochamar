const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Stance = require('../models/stance');
const app = express();

app.delete('/stances/delete/all', function(req, res) {
  Stance.deleteMany({}, function (err, stances) {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      deleteAll: true,
      deletedCount: stances.deletedCount,
    });
  });
});

app.get('/stances', function(req, res) {
  let from = req.query.from || 0;
  from = Number(from);
  let to = req.query.to || 50;
  to = Number(to);
  Stance.find(null)
    .skip(from)
    .limit(to)
    .exec((err, stances) => {
      if (err) return res.status(400).json({ ok: false, err });
      Stance.count({ estado: true }, (err, conteo) => {
        res.json({
            ok: true,
            stances,
            cuantos: conteo
        });
      });
    });
});

app.post('/stances/create', function(req, res) {
  let body = req.body;
  let stances = new Stance({
      id: body.id,
      idGroup: body.idGroup,
      startDate: body.startDate,
      endDate: body.endDate,
      numberPassanger: body.numberPassanger,
      typePension: body.typePension
  });
  stances.save((err, stancesDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      ok: true,
      stances: stancesDB
    });
  });
});

module.exports = app;
