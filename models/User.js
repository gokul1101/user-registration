const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  created_at: { type: Date, default: new Date() },
});

module.exports = model("users", userSchema);
