var express = require('express');
var app = express();
require('./routes')(app);
app.listen(80);
console.log('Listening on port 80...');