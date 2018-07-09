const express = require("express");
const app = express();
//app server; get =registers route handler; req incoming request; res=response data sent to whomever made a resquest
app.get("/", (req, res) => {
  res.send("hi there");
});
//express is telling node to listen for traffic in this port
//env=environment variables
const PORT = process.env.PORT || 5000;
app.listen(PORT);
