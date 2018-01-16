const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index');
});

io.on('connection', function (socket) {
    console.log('Connection: ' + socket.id);
    socket.on('sendMessage', function (msg) {
        socket.emit('showMessage', msg);
        socket.broadcast.emit('sendMessage', msg);
    });
});

server.listen(port || 3000, function () {
    console.log('Your app is listening on port ' + this.address().port);
});