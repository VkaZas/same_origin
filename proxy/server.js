var port = process.env.port || 3000;
var express = require('express');
var app = express();
var path = require("path");
var http = require('http');
var request = require("request");

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/proxy/:id', function(req, res) {
    var options = {
        host: 'http://www.swapi.co',
        path: '/api/people/',
        port: 80,
        method: 'GET'
    }

    if (!req.params.id) {
        req.params.id = 1;
    }

    request.get({
        url: options["host"] + options["path"] + req.params.id
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Response received!");
            var payload = {
              body: JSON.parse(body),
              msg: "This is from our proxy server"
            }
            res.send(payload);
        }
    });
});

app.listen(port, function() {
    console.log('Listening on port', port);
    console.log("Try http://localhost:" + port + "/proxy/4");
});
