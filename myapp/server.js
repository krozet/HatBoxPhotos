/**
 * @author Keawa Rozet, Albert Du, U Keong Cheong
 * @name Server
 * @package Sources
 * @description This is the server for the backend database
 **/

/**
 * Import dependencies for image upload and processing.
 * @module express to handle routing.
 * @module body-parser for parsing body requests.
 * @module mongoose to map MongoDB database.
 * @module express-session use to track log ins.
 * @module connect-mongo use to track mongodb sessions.
 **/
var express = require('express');
var renderToString = require('react-dom/server');
var React = require('react');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var users = require('./routes/UserAccountRouter');
var images = require("./routes/UploadedImageRouter");
var categories = require("./routes/CategoryRouter");


const app = express();
const port = 8080;

/**
 * @summary Connect mongoose to MongoDB database
 **/
const options = {
    autoReconnect: true,
    auth: {authdb: 'admin'},
user: 'admin',
pass: 'csc648root'
};

/**
 * @summary CORS - This is used to validate the content passed from url to url
 **/
app.use((req, res, next) => {
  // Allows for multiple Access Control Allow Origin's
  var allowedOrigins = ['http://localhost:3000', 'https://hatboxphotos.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Vary: Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'Options') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    return res.status(200).json({});
  }
  next();
});

/**
 * @summary This is used to connect to the Mongodb database remotely
 * port 27020 is configured by Nginx to proxy_pass to the default 27017 port
 * that Mongodb listens for
 * @param options is used for database authentication
 **/
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://hatboxphotos.com:27020/hatboxphotosDB", options);

// use this for testing post, so the db doesn't get overflooded
// mongoose.connect("mongodb://hatboxphotos.com:27020/testDB", options);

/**
 * @summary Signals Mongoose connected successfully
 **/
mongoose.connection.once('open', function () {
    console.log('Mongoose connection has been made!');
}).on('error', function (error) {
    console.log('Mongoose connection error:', error);
});
var db = mongoose.connection;

/**
 * @summary Use sessions for tracking logins
 **/
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: db})
    })
);

/**
 * @summary Bind connection to error event
 **/
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

/**
 * @summary Parse incoming requests
 **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * @summary GET method used to ensure a connection to the backend is made
 * @param "/" true path is https://hatboxphotos.com/
 **/
app.get("/", (req, res) => {
    res.send('Express server running.');
});

/**
 * @summary GET method used to handle service-worker
 * @param "/service-worker.js" true path is https://hatboxphotos.com/service-worker.js
 **/
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "service-worker.js"));
});

/**
 * @summary include routes
 **/
app.use('/users', users);
app.use('/images', images);
app.use('/categories', categories);


/**
 * @summary selects the port for the server to listen to
 **/
app.listen(port, () => {
    console.log("Server is listening  to port: " + port);
});
