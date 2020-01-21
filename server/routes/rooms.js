const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Rooms = require('../models/rooms');
const app = express();

app.delete('/rooms/delete/all', function(req, res) {
  Rooms.deleteMany({}, function (err, lodging) {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      deleteAll: true,
      deletedCount: lodging.deletedCount,
    });
  });
});

app.get('/rooms', function(req, res) {
  Rooms.find({})
  .exec((err, rooms) => {
    if (err) return res.status(400).json({ ok: false, err });
    Rooms.count({}, (err, length) => {
      res.json({
        status: true,
        rooms,
        length
      });
    });
  });
});

app.post('/rooms/create', function(req, res) {
  let body = req.body;
  let rooms = new Rooms({
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
