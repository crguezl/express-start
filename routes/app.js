var express = require('express')
var app = express()
var path = require('path');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// How to use a separated router: express.Router
var birds = require('./birds');
app.use('/birds', birds);

// a middleware mounted on /usuario/:id; will be executed for any type of HTTP request to /usuario/:id
app.use('/usuario/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a route and its handler function (middleware system) which handles GET requests to /usuario/:id
app.get('/usuario/:id?', function (req, res, next) {
  console.log(req.params);
  res.send('USUARIO: '+(req.params.id || 'unknown' ));
});

// route with two callbacks
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...')
  next();
}, function (req, res) {
  res.send('Hello from B!')
});

// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Got a GET request'+
    '<br/><img src="images/kitten.jpg" />'
  );
})

//json
app.get('/json', function(req, res) {
  res.json({ user: 'tobi'});
});

// another way to respond with json
app.get('/json2', function(req, res) {
  res.send({ some: 'json' });
});

//download a file
app.get('/download', function (req, res) {
  res.download("public/images/kitten.jpg");
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  console.log(req.body);
  res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})

app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ... with method '+req.method)
  res.send('Got a '+req.method+' request at /secret');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
