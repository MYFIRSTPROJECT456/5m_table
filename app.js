
var express = require('express')
, routes = require('./routes')
, http = require('http')
, path = require('path')
, compression = require('compression')
, async = require('async')
, session = require('express-session');
var multer = require('multer');  

var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");

//database connection
var connection = mysql.createConnection({
  host     : 'apicaldevserver.eastus2.cloudapp.azure.com',
  user     : 'root',
  password : 'root',
  database : 'FV00012',
  debug:false,
  multipleStatements: true
});

//connection.connect();

//constants
const AES = require('mysql-aes');
global.AES = require('mysql-aes');
global.db = connection;
global.url="https://apicaldevserver.eastus.cloudapp.azure.com/lms/lms_webt/"; 

// all environments
app.use(compression());
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({secret: 'apical'}));

app.use(session(
  { secret: "apical", maxAge: Date.now() + (30 * 86400 * 1000)
}));


//one session
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
        delete req.user.pwd; // delete the password from the session
        req.session.user = req.user;  //refresh the session value
        res.locals.user = req.user;
        next();
      } else {
        next();
      }
    });

app.use(function(err, req, res, next) {  
  res.status(err.status || 500);  
  res.render('error', {  
    message: err.message,  
    error: err  
  });  
});


//common routes
var index = require('./routes/index');
var transaction = require('./routes/account_master/transaction');
var user = require('./routes/user');
var dropdown = require('./routes/utils/dropdown/dropdown');
//Middleware
app.get('/', routes.index);//call for main index page
app.post('/transaction',transaction.build);
app.post('/login',user.login);
app.use('/v1', dropdown);

//listen to port
var server=app.listen(3000);
server.on('connection', function(socket) {
  console.log("A new connection was made by a client.");
  socket.setTimeout(30 * 86400 * 1000);
  // 30 second timeout. Change this as you see fit.
});

