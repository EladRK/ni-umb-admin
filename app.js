"use strict";

var express = require('express');
var app = express();

app.use('/node_modules/ng-admin/build/', express.static(__dirname + '/node_modules/ng-admin/build/'));

app.use(express.static('public'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


