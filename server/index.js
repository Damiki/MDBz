const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const rand = require('random-key');


//requiring mysql
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D@ve7sql',
    database: 'music'
});

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getStartTime(){
    const currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    let seconds = currentTime.getSeconds()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    return (hours+":"+minutes+":"+seconds);
}

connection.connect(() => {

    app.use(cookieParser());

    //Get rid of cookie when back to login
    app.get('/login', (req,res) =>{
            res.clearCookie('sid');
            res.end(console.log('loginin'));
    });

    //Check existence of Username
    app.get('/user/:username', (req, res) => {
        const { username } = req.params;
        console.log('username: '+username);
        connection.query("SELECT USER_NAME FROM USERS WHERE USER_NAME = '" + username + "';", (err, result) => {
            if (err) throw(err);
            
            console.log('\nresults: '+result[0].USER_NAME);

            if (isEmpty(result)) {
                connection.query("INSERT INTO USERS VALUES('" + username + "','UserImg.png');")
            }


            //GENERATE RANDOM SESSION IDs
            const sid = rand.generate(10);
            
            //Get Start Time of the Session
            const starttime = getStartTime();
            console.log("\nSTART TIME: "+starttime);
            console.log("\nSID: "+sid);

            // connection.query(
            //     "INSERT INTO SESSIONS(S_ID,USER_NAME,LOGGED_IN,START_TIME) VALUES('"+sid+"','"+username+"',1,'"+starttime+"');"
            // )

            res.cookie('sid',sid).send(result);

        });
    });

    // app.get('/ratings/:username', (req, res) => {

    //     const {username} = req.params;

    //     connection.query("SELECT R.ALBUM_ID,R.RATING,A.TITLE,A.ARTIST_NAME FROM RATINGS AS R JOIN (SELECT A.TITLE,A.ALBUM_ID,U.ARTIST_NAME FROM ALBUMS AS A JOIN ARTISTS AS U ON A.ARTIST_ID = U.ARTIST_ID) AS A WHERE R.USER_NAME = '" + username + "';", function (err, result) {
    //         if (err) throw (err);
    //         console.log('rating result: '+result);
    //         res.json(result);

    //     })
    // });

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