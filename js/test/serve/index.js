var express = require('express');
var app = express.createServer();

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../../..'));
app.listen(PORT);
