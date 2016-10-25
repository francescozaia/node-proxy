var express = require('express');
var app = express();
require('./routes')(app);
app.listen(3001);
console.log('Listening on port 3001...');