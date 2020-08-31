"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movie = new Schema({
  name: {
    type: String,
    default: "",
    required: "Please fill name",
    trim: true,
  },
  img: {
    type: String,
    required: "Please fill images",
  },
  ratting: {
    type: Number,
  },
  movieType: {
    type: String,
  },
  isSoundtrack: {
    type: Boolean,
    default: true,
    // true = sonudtrack
  },
});

mongoose.model("Movie", movie);
// สามารถแสดงรายละเอียดของหนังได้ ประกอบด้วย ชื่อหนัง, รูป, เรทติ้ง, ประเภทหนัง และพากย์ไทยหรือsound track
// ในแต่ละวันจะฉายหนัง 3 รอบ
// รอบแรก 09:00
// รอบที่2 12:00
// รอบสุดท้าย 18:00
