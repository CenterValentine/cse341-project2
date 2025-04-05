const express = require('express');
const mongodb = require('./models/data/database');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github').Strategy;




const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
};

// app.use(swaggerRoutes);

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err){console.log(err);}
    else{
        app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
    }

});