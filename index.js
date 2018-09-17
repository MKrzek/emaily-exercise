const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
//nothing is returned from the below statement so we can just condense it
require("./models/User");
require('./models/Survey');
require("./services/passport");

//condensed version of what is above

mongoose
  .connect(keys.mongoURI, {useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app)
if (process.env.NODE_ENV === "production") {
  //Express will serve production assests like main.js file
  app.use(express.static("client/build"));
  //Express will serve index.html if the route does not exist
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//app server; get =registers route handler; req incoming request; res=response data sent to whomever made a resquest
// app.get("/", (req, res) => {
//   res.send("hi there, ahahahahahha");
// });
//express is telling node to listen for traffic in this port
//env=environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
