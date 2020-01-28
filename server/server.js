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

app.use(require('./routes/usuario'));
app.use(require('./routes/lodging'));
app.use(require('./routes/rooms'));
app.use(require('./routes/config'));
app.use(require('./routes/company'));
app.use(require('./routes/reports'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
