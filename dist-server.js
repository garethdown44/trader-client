var express = require('express');
var compression = require('compression');
var app = express();

app.use(compression());

app.set('port', (process.env.PORT || 8080));

app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});