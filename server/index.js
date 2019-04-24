const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const rand = require('random-key');


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

function getTime(){
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

    //Check if Logged In
    app.get('/check', (req,res) =>{

        const sid = req.cookies.sid;
        connection.query("SELECT LOGGED_IN FROM SESSIONS WHERE S_ID ='"+sid+"';", (err,result) =>{
            if(err) throw(err);
            if(!isEmpty(result)){
                console.log("\nChecking: "+result);
                res.json(result[0].LOGGED_IN);
            }
            else 
            res.json(result);
        });

    });

    //Get username
    app.get('/username',(req,res) =>{
        const sid = req.cookies.sid;
        console.log("SID in USERNAME ROUTE"+sid);
        connection.query("SELECT USER_NAME FROM SESSIONS WHERE S_ID='"+sid+"';",(err,result)=>{
            if(err) throw(err)

            res.json(result[0].USER_NAME);
        });
    })

    //Pass username for checking
    app.get('/user/:username', (req, res) => {
        const { username } = req.params;
        console.log('username: '+username);


        //Check existence of Username        
        connection.query("SELECT USER_NAME FROM USERS WHERE USER_NAME = '" + username + "';", (err, result) => {
            if (err) throw(err);
            
            console.log('\nresults: '+result[0].USER_NAME);

            //insert Username to DB if username doesnt exist in DB
            if (isEmpty(result)) {
                connection.query("INSERT INTO USERS VALUES('" + username + "','UserImg.png');")
            }


            //GENERATE RANDOM SESSION IDs
            const sid = rand.generate(10);
            
            //Get Start Time of the Session
            const starttime = getTime();
            console.log("\nSTART TIME: "+starttime);
            console.log("\nSID: "+sid);


            //Insert session details to DB
            connection.query(
                "INSERT INTO SESSIONS(S_ID,USER_NAME,LOGGED_IN,START_TIME) VALUES('"+sid+"','"+username+"',1,'"+starttime+"');"
            );


            //Set Cookie and send results
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


    app.get('/logout', (req,res)=>{
        const sid = req.cookies.sid;
        connection.query("UPDATE SESSIONS SET LOGGED_IN = 0 WHERE S_ID ='"+sid+"';");
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