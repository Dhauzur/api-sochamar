const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const ToDo = require('../models/wasDone');
const app = express();

app.get('/wasDone', function(req, res) {
  let from = req.query.from || 0;
  from = Number(from);
  let to = req.query.to || 5;
  to = Number(to);
  ToDo.find(null, 'workPlace whatWasDone ncamas date')
    .skip(from)
    .limit(to)
    .exec((err, todoes) => {
      if (err) return res.status(400).json({
          ok: false,
          err
      });

      ToDo.count({ estado: true }, (err, conteo) => {
          res.json({
              ok: true,
              todoes,
              cuantos: conteo
          });
      });
    });
});

app.post('/wasDone/create', function(req, res) {
  let body = req.body;
  let toDo = new ToDo({
      workPlace: body.workPlace,
      whatWasDone: body.whatWasDone,
      ncamas: body.ncamas,
      date: body.date
  });
  toDo.save((err, tododb) => {
    if (err) {
      return res.status(400).json({
          ok: false,
          err
      });
    }
    res.json({
      ok: true,
      ToDo: tododb
    });
  });
});
//
// app.put('/usuario/:id', function(req, res) {
//
//     let id = req.params.id;
//     let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
//
//     Orden.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
//
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//
//
//
//         res.json({
//             ok: true,
//             usuario: usuarioDB
//         });
//
//     })
//
// });
//
// app.delete('/usuario/:id', function(req, res) {
//
//
//     let id = req.params.id;
//
//     // Orden.findByIdAndRemove(id, (err, usuarioBorrado) => {
//
//     let cambiaEstado = {
//         estado: false
//     };
//
//     Orden.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
//
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         };
//
//         if (!usuarioBorrado) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Orden no encontrado'
//                 }
//             });
//         }
//
//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         });
//
//     });



// });



module.exports = app;
