var express = require('express');
var exphbs  = require('express-handlebars');
const mpControllers = require('./controllers/mercadopago');
const bodyParser = require('body-parser');

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({'extended':'false'}));            
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

//Payment
app.get('/payment/failure', function (req, res) {
    res.render('failure', req.query);
});

app.get('/payment/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/payment/pending', function (req, res) {
    res.render('pending', req.query);
});


//Mercadopago
app.post('/mp/notification', (req,res)=>{
    mpControllers.getNotification(req,res);
});
app.post('/mp/payment', (req,res)=>{
    mpControllers.createPayment(req,res);
});

//
app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT);