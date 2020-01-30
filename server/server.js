require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
	if (err) throw err;
	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', process.env.PORT);
});
