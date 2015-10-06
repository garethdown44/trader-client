var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});