//keys.js-figure out what set of credentials to return
//tjis is set up by heroku
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod.js");
} else {
  module.exports = require("./dev.js");
}
