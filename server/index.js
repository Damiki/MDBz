const express = require('express');
const app = express();

//requiring mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dam',
    password: 'D@miki4sql',
    database: 'music'
});

connection.connect(() => {
    app.get('/test', (req, res) => {
    
        connection.query('SELECT * FROM users', function (err, result) {
            if (err) throw(err);
    
            res.json(result);
        })

    });
    
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    
    app.use((err, req, res, next) => {
        res.locals.err = err;
        res.status(err.status);
        res.end('error!');
    })
    
    app.listen(3030, console.log('server listening at 3030'));
})