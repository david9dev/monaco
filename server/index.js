const express = require('express');
const app = express();
const {json} = require('express');
app.use(json());
app.use(express.static(`${__dirname}/../build`))
let text = "";

const server = app.listen(4000,() => console.log('port', 4000))
const io = require('socket.io')(server);

io.on('connection', (socket) =>
{
    console.log('user connected');
    io.emit('message dispatched', 'hello');
    io.emit('text dispatch', text);
    socket.on('update text',(stext) =>
    {
        let text = stext;
        // console.log(text);
        socket.broadcast.emit('text dispatch', text);
    })
})


