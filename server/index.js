const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const rand = require('random-key');
const dateTime = require('node-datetime');

//requiring mysql
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'dam',
    password: 'D@miki4sql',
    database: 'music'
});


function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function getDate() {
    const dt = dateTime.create();
    const formatted = dt.format('Y-m-d H:M:S');
    console.log("FORMATTED: " + formatted);
    return (formatted);

}

connection.connect(() => {

    app.use(cookieParser());

    app.use(express.static('Images'));

    //Check if Logged In
    app.get('/check', (req, res) => {

        const sid = req.cookies.sid;
        connection.query("SELECT LOGGED_IN FROM SESSIONS WHERE S_ID ='" + sid + "';", (err, result) => {
            if (err) throw (err);
            if (!isEmpty(result)) {
                console.log("\nChecking: " + result);
                res.json(result[0].LOGGED_IN);
            }
            else
                res.json(0);
        });

    });

    //Get username
    app.get('/username', (req, res) => {
        const sid = req.cookies.sid;
        console.log("SID in USERNAME ROUTE" + sid);
        connection.query("SELECT USER_NAME FROM SESSIONS WHERE S_ID='" + sid + "';", (err, result) => {
            if (err) throw (err)

            res.json(result[0].USER_NAME);
        });
    })

    //Pass username for checking
    app.get('/user/:username', (req, res) => {
        const { username } = req.params;
        console.log('username: ' + username);


        //Check existence of Username        
        connection.query("SELECT USER_NAME FROM USERS WHERE USER_NAME = '" + username + "';", (err, result) => {
            if (err) throw (err);


            //insert Username to DB if username doesnt exist in DB
            if (isEmpty(result)) {
                connection.query("INSERT INTO USERS VALUES('" + username + "','UserImg.png');")
            }


            //GENERATE RANDOM SESSION IDs
            const sid = rand.generate(10);

            //Get Start Time of the Session
            const starttime = getDate();
            console.log("\nSTART TIME: " + starttime);
            console.log("\nSID: " + sid);


            //Insert session details to DB
            connection.query(
                "INSERT INTO SESSIONS(S_ID,USER_NAME,LOGGED_IN,START_TIME) VALUES('" + sid + "','" + username + "',1,'" + starttime + "');"
            );


            //Set Cookie and send results
            res.cookie('sid', sid).send(result);

        });
    });

    app.get('/search/:keyword', (req, res) => {
        console.log("HOSHOSDH");
        const { keyword } = req.params;
        connection.query("SELECT A.ALBUM_ID AS albumid,A.TITLE AS albumname,B.ARTIST_NAME AS artist, A.ALBUM_ART AS albumart FROM ALBUMS AS A JOIN ARTISTS AS B ON A.ARTIST_ID = B.ARTIST_ID WHERE A.TITLE LIKE '%" + keyword + "%';", (err, result) => {
            if (err) throw (err);
            console.log('keyword' + keyword);
            console.log('result:' + result);
            res.json(result);
        })
    });

    app.get('/ratings/:username', (req, res) => {

        const { username } = req.params;
        console.log("username:" + username);
        connection.query("SELECT R.ALBUM_ID, R.USER_NAME, R.RATING,A.TITLE,A.ARTIST_NAME FROM RATINGS AS R JOIN (SELECT A.ARTIST_NAME ,B.TITLE ,B.ARTIST_ID ,B.ALBUM_ID  FROM ARTISTS AS A JOIN ALBUMS AS B ON A.ARTIST_ID=B.ARTIST_ID) AS A ON R.ALBUM_ID =A.ALBUM_ID WHERE R.USER_NAME = '" + username + "';", function (err, result) {
            if (err) throw (err);
            console.log('rating result: ' + result);
            res.json(result);

        })
    });

    app.get('/album_user_rating/:title/:username', (req, res) => {
        
        const data = {
                "title": req.params.title,
                "username": req.params.username
        };

        console.log(req.params);
        console.log('title: '+data.title);
        console.log('username: '+data.username);

        connection.query("SELECT R.RATING AS rating FROM RATINGS AS R JOIN ALBUMS AS A ON R.ALBUM_ID = A.ALBUM_ID WHERE A.TITLE = '"+data.title+"' AND R.USER_NAME = '"+data.username+"' ORDER BY R.RATE_TIME DESC LIMIT 5;", function (err, result) {
            if (err) throw (err);
            console.log('ratings: ' + result);
            res.json(result);
        })
    });

    app.get('/songs/:title', (req, res) => {

        const { title } = req.params;

        connection.query("SELECT S.TITLE AS title,S.SONG_ID AS songid FROM SONGS AS S JOIN ALBUMS AS A ON S.ALBUM_ID = A.ALBUM_ID WHERE A.TITLE = '" + title + "';  ", function (err, result) {
            if (err) throw (err);
            console.log('songs: ' + result);
            res.json(result);
        })
    });

    app.get('/userratings/:title/:username', (req, res) => {
        
        const data = {
                "title": req.params.title,
                "username": req.params.username
        };

        console.log(req.params);
        console.log('title: '+data.title);
        console.log('username: '+data.username);

        connection.query("SELECT R.RATING AS rating,R.RATE_TIME AS ratetime,R.USER_NAME AS username FROM RATINGS AS R JOIN ALBUMS AS A ON R.ALBUM_ID = A.ALBUM_ID WHERE A.TITLE = '"+data.title+"' AND R.USER_NAME != '"+data.username+"' ORDER BY R.RATE_TIME DESC LIMIT 5;", function (err, result) {
            if (err) throw (err);
            console.log('ratings: ' + result);
            res.json(result);
        })
    });

    app.get('/setrating/:title/:username/:rating', (req, res) => {
        
        const data = {
                "title": req.params.title,
                "username": req.params.username,
                "rating": req.params.rating
        };
        const rtime = getDate();
        let albumid = 0;
        console.log('title: '+data.title);
        console.log('username: '+data.username);

        connection.query("SELECT ALBUM_ID AS albumid FROM ALBUMS WHERE TITLE = '"+data.title+"';",function(err,result){
            if(err)throw(err);
            albumid = result[0].albumid;
            console.log("album id:"+albumid)
        });
        connection.query("SELECT R.RATING,R.ALBUM_ID AS albumid FROM RATINGS AS R JOIN ALBUMS AS A ON R.ALBUM_ID = A.ALBUM_ID WHERE A.TITLE = '"+data.title+"' AND R.USER_NAME = '"+data.username+"';", function (err, result) {
            if (err) throw (err);
            if(isEmpty(result)){
                connection.query("INSERT INTO RATINGS VALUES ("+albumid+",'"+data.username+"',"+data.rating+",'"+rtime+"');",function(err,result){
                    if (err) throw (err);
                });
            }else {
                connection.query("UPDATE RATINGS SET RATING ="+data.rating+", RATE_TIME='"+rtime+"' WHERE USER_NAME= '"+data.username+"' AND ALBUM_ID = "+albumid+";",function(err,res){
                    if (err) throw (err);
                });
            }
        })
    });

    app.get('/logout', (req, res) => {
        const sid = req.cookies.sid;
        const stopTime = getDate();
        connection.query("UPDATE SESSIONS SET LOGGED_IN = 0 WHERE S_ID ='" + sid + "';");
        connection.query("UPDATE SESSIONS SET STOP_TIME ='" + stopTime + "' WHERE S_ID ='" + sid + "';");
        res.clearCookie("sid");
        res.end(console.log('Logged Out'));
    })

    app.use((req, res) => {
        const err = new Error('Not Found');
        err.status = 404;
        res.locals.err = err;
        res.status(err.status);
        res.end('Error!');
    });


    app.listen(3030, console.log('server listening at 3030'));
})