const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});
//creates a collection and uses userSchema
mongoose.model("users", userSchema);
