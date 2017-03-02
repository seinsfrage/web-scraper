var express       = require('express'),
	exphbs        = require('express-handlebars'),
	bodyParser    = require('body-parser'),
	cheerio       = require('cheerio'),
	mongoose      = require('mongoose'),
	request       = require('request'),
	requestRouter = require('./request/request.js'),
	htmlRouter    = require('./routing/htmlroutes.js');

mongoose.connect("mongodb://heroku_84t071jh:d5542lmek2tjj0u54lejkp9s5p@ds115738.mlab.com:15738/heroku_84t071jh");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

var app = express(),
	PORT = 3000;

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(requestRouter.Router);
app.use(htmlRouter);
app.use(express.static(process.cwd() + '/public'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.listen(PORT || process.env.PORT, function () {
	console.log("Listening on port " + PORT);
});