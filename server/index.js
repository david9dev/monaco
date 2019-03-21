const express = require('express');
const app = express();
const {json} = require('express');

app.use(json());
app.use(express.static(`${__dirname}/../build`))

app.listen(4000,() => console.log('port', 4000))
