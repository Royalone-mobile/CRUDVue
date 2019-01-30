const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');

const PORT = process.env.PORT || 8000;
var session = require('express-session')

const app = express();

/* DB Setup */
mongoose.connect('mongodb://root:rentall1@ds127954.mlab.com:27954/rentall', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

/* App Setup */

/* use morgan to log requests to the console */
app.use(morgan('combined'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
/* use body parser so we can get info from POST and/or URL parameters */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* [CONFIGURE ROUTER] */
router(app);
/* Input seed datas to mongo database */
const seed = require('./models/seed');
/* Answer API requests. */
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!, were lit!!!!!"}');
});

/* All remaining requests return the React app, so it can handle routing. */
var server = app.listen(PORT, function () {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});

