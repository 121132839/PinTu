var express = require('express');
var app = express();


app.use(express.static("./"));

app.listen(3000, function () {   //监听http://127.0.0.1:3000端口
    console.log("server start");
});

