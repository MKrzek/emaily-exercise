const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
//nothing is returned from the below statement so we can just condense it
require("./models/User.js");
require("./services/passport");

//condensed version of what is above

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);

//app server; get =registers route handler; req incoming request; res=response data sent to whomever made a resquest
// app.get("/", (req, res) => {
//   res.send("hi there, ahahahahahha");
// });
//express is telling node to listen for traffic in this port
//env=environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
