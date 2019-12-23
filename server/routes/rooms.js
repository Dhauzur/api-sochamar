const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Stance = require('../models/rooms');
const app = express();

app.get('/rooms', function(req, res) {
  let from = req.query.from || 0;
  from = Number(from);
  let to = req.query.to || 50;
  to = Number(to);
  Stance.find(null)
  .skip(from)
  .limit(to)
  .exec((err, rooms) => {
    if (err) return res.status(400).json({ ok: false, err });
    Stance.count({ estado: true }, (err, conteo) => {
      res.json({
        ok: true,
        rooms,
        length: conteo
      });
    });
  });
});

app.post('/rooms/create', function(req, res) {
  let body = req.body;
  let rooms = new Stance({
      id: body.id,
      name: body.name,
      numberPassangerMax: body.numberPassangerMax
  });
  rooms.save((err, roomsDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      ok: true,
      rooms: roomsDB
    });
  });
});


module.exports = app;
