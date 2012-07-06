var path = require('path');
var express = require('express');
var app = express.createServer();

var PORT = process.env.PORT || 3000;
var baseDir = path.resolve(__dirname + '/../../..');

console.log("Serving", baseDir, "on port", PORT);
app.use(express.static(baseDir));
app.listen(PORT);
