const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const path = require('path');
require('dotenv').config()
const fetch = require('node-fetch');
const { auth } = require('express-openid-connect');
const db = require('../server/db/db-connection.js'); 
//const { default: App } = require('../client/src/App.js');
const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');
const app = express();


/************************************/
//IMPORTS
const { expressjwt: jwt } = require('express-jwt')
const jwks = require('jwks-rsa')
const axios = require('axios')
/************************************/


//LastFM api key
const LastFM_Key = process.env.LASTFM_API_KEY

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASEURL
}


const PORT = process.env.PORT || 3001;
app.use(cors());
//AUTH0 - this must be located here after cors
app.use(express.json());
app.use(auth(config));
app.use(bodyParser.json())


/********************************************/
//Create a middleware using JWT
const verifyJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        ratelimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://lex-llanes.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'Just a unique string of words for unique purposes',
    issuer: 'https://lex-llanes.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: ['/']})

//Now we can use the middleware we made
app.use(verifyJwt);
/********************************************/

/**************************************************************************/
app.get('/', (req,res) => {
    res.send('Hello from index route')
})

app.get('/protected', (req, res) => {
    //The middleware takes whatever the payload and attaches it to req.user object which we are sending to the client
    console.log(req.user)
    res.send(req.user)
})

app.use((req, res, next) => {
    const error = new error('Not Found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || 'Internal server error'
    res.status(status).send(message)
})
/**************************************************************************/







// //creates an endpoint for the route /api
// app.get('/', (req, res) => {
//     //AUTH0 - req.isAuthenticated is provided from the auth router£
//     console.log(req.oidc.isAuthenticated())
//     // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//     res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
// });


// /* ROUTE FOR GETTING USER DATA */
// app.get('/api/me', (req, res) => {
//     if(req.oidc.isAuthenticated()){
//         res.json(req.oidc.user);
//     } else {
//         res.status(401).json({error: "Error in the auth0"})
//     }
// })


/*ROUTE FOR GET ALL BLOGS FROM A SPECIFIC USER*/
//Might have to use a GET request with a params
app.post('/bloglist', async (req, res) => {
    try {
        const { userName } = req.query;
        //blogList will look in my blogs table for any blogs associated with the username
        const blogList = await db.query('SELECT * FROM blogs WHERE username ILIKE $1', [`%${userName}%`])
        res.json(blogList.rows)
    } catch (error) {
        console.error(error.message)
    }
})


/*POST - CREATE A NEW BLOG POST*/
app.post('/userblog', async (req, res) => {
    try {
        const { blogPrivacy } = req.body;
        const { blogCategory } = req.body;
        const { blogGenre } = req.body;
        const { blogTitle } = req.body;
        const { blogContent } = req.body;
        const { userName } = req.body;

        const newblog = await db.query(
            'INSERT INTO blogs(blog_title, blog_category, blog_search, blog_content, blog_privacy, username) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [blogTitle, blogCategory, blogGenre, blogContent, blogPrivacy, userName]
        )
    } catch (error) {
        console.error(error.message)
    }
})



//MEMO TO SELF: TWO METHODS SO CHECK WHICH ONE WORKS (OR WORKS BETTER) AS NOT SURE IF I HAVE TO DO A GET (WITH MULTIPLE PARAMS) OR JUST DO A POST REQUEST SO I CAN USE A BODY//
/*POST method - for acquiring song infos*/
app.post('/song', async (req, res) => {
    try { 
        const { artistName, trackName } = req.body;

        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=LastFM_Key&artist=${artistName}&track=${trackName}}&format=json`)
        const body = await response.json();

        return res.send(body);
    } catch (error) {
        console.error(error.message)
    }
})
/*GET method*/
app.get('/song/:artistName/:trackName', async (req, res) => {
    try {
    const { artistName } = req.params;
    const { trackName } = req.params;

        const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=LastFM_Key&artist=${artistName}&track=${trackName}}&format=json`)
        const body = await response.json();

        return res.send(body);
    } catch (error) {
        console.error(error.message)
    }
})







//This must be located after the first GET request
app.use(express.static(REACT_BUILD_DIR));
// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

