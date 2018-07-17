const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
//nothing is returned from the below statement so we can just condense it
const passportConfig = require("./services/passport");
//condensed version of what is above
require("./services/passport");
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
const app = express();
require("./routes/authRoutes")(app);

//app server; get =registers route handler; req incoming request; res=response data sent to whomever made a resquest
// app.get("/", (req, res) => {
//   res.send("hi there, ahahahahahha");
// });
//express is telling node to listen for traffic in this port
//env=environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
