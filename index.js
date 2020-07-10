var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {

});
server.listen(8000, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        setInterval(() => {
            const temperature = Math.round(Math.random() * 1000) / 10;
            const airPressure = Math.round(Math.random() * 1000) / 10;
            const humidity = Math.round(Math.random() * 1000) / 10;

            let payload = {};

            const random = Math.random();
            if (random < 0.33) {
                payload = { temperature }
            } else if (random > 0.33 && random < 0.66) {
                payload = { airPressure }
            } else {
                payload = { humidity }
            }

            connection.send(JSON.stringify({ data: payload }))
        }, Math.random() * 1000)
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});