"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seat = new Schema({
  //   name: {
  //     type: String,
  //     default: "",
  //     unique: "Name already exists",
  //     required: "Please fill name",
  //     trim: true,
  //   },
});

mongoose.model("Seat", seat);
