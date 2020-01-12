const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Company = require('../models/company');
const app = express();

app.delete('/company/delete/all', function(req, res) {
  Company.deleteMany({}, function (err, company) {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      deleteAll: true,
      deletedCount: company.deletedCount,
    });
  });
});

app.get('/company', function(req, res) {
  let from = req.query.from || 0;
  from = Number(from);
  let to = req.query.to || 50;
  to = Number(to);
  Company.find({})
  .skip(from)
  .limit(to)
  .exec((err, company) => {
    if (err) return res.status(400).json({ ok: false, err });
    Company.count({}, (err, length) => {
      res.json({
        status: true,
        company,
        length
      });
    });
  });
});

app.post('/company/create', function(req, res) {
  let body = req.body;
  let company = new Company({
    rut: body.rut,
    name: body.name,
    prices: body.prices
  });
  company.save((err, companyDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({
      ok: true,
      company: companyDB
    });
  });
});


module.exports = app;
