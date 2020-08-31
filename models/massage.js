"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const message = new Schema({
  message: {
    type: String,
  },
  server: {
    type: Boolean,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
    autopopulate: true,
  },
});
message.plugin(require("mongoose-autopopulate"));
mongoose.model("Message", message);