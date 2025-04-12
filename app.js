const express = require("express");
const mongodb = require("./models/data/database");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const app = express();
// app.set('trust proxy', true);

const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// console.log('Render URL check: ',process.env.RENDER_EXTERNAL_URL)

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, z-Key, Authorization",
};

// app.use(swaggerRoutes);

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

const port = process.env.PORT || 3000;

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.json())
app.use(passport.initialize()); 
app.use(passport.session());
app.use("/", require("./routes/index"));

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }, function (accessToken, refreshToken, profile, done) {
    console.log("Google profile: ", profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(null, profile);
    // });
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
}
);

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
});

app.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/api-docs',
  //  session: false

  }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    console.log('User session: ', req.session.user);
    res.redirect('/');
  });


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
