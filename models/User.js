const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String
});
//creates a collection and uses userSchema
mongoose.model("users", userSchema);
