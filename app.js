const express = require("express");
const app = express();
const passport = require("passport");
const path = require("path");
var bodyParser = require("body-parser");
const session = require("express-session");
const helmet = require("helmet");
const normalRoutes = require("./routes/normalRoutes");
const accessip = require("./routes/accessip");
var mongoose = require("mongoose");
const setuppassport = require("./passport/setuppassport");
var cookieParser = require("cookie-parser");
const connectMongo = require("connect-mongo");
const flash = require("connect-flash");

mongoose.Promise = global.Promise;
const MongoStore = connectMongo(session);
setuppassport();
var addr = "mongodb://127.0.0.1/test2";
var promise = mongoose.connect(addr);

app.use(
  helmet({
    hidePoweredBy: true,
    noSniff: true,
    xssFilter: true
  })
);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const sess = {
  resave: true,
  saveUninitialized: true,
  secret: "$@##(*$*$#&#$&*#*()",
  proxy: false,
  name: "sessionId",
  cookie: {
    httpOnly: true,
    secure: false
  },
  store: new MongoStore({
    url: addr,
    autoReconnect: true
  })
};

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(accessip)
app.use(normalRoutes);

app.listen(4000, () => {
  console.log("Server is runing on port 4000");
});
