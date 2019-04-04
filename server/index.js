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

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

connection.connect(() => {
    app.get('/user/:username', (req, res) => {
        
        const {username} = req.params;
        
    
        connection.query("SELECT USER_NAME FROM USERS WHERE USER_NAME = '"+username+"';", function (err, result) {
            if (err) throw(err);
            
            res.json(result);

            if(isEmpty(result)){
                connection.query("INSERT INTO USERS VALUES('"+username+"','UserImg.png');")
            }

        });

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