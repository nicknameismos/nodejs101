"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theater = new Schema({
  movie: {
    type: Schema.ObjectId,
    ref: "Movie",
    autopopulate: true,
  },
  date: {
    type: Date,
  },
  round: [
    {
      name: {
        type: String,
      },
      time: {
        type: Date,
      },
      2: {
        type: Boolean,
        default: true,
      },
      seat: [
        {
          type: {
            type: String,
          },
          price: {
            type: Number,
          },
          status: {
            type: String,
          },
          seatNo: {
            type: Number,
          },
        },
      ],
    },
  ],
});

theater.plugin(require("mongoose-autopopulate"));
mongoose.model("Theater", theater);
// ในแต่ละวันจะฉายหนัง 3 รอบ
// รอบแรก 09:00
// รอบที่2 12:00
// รอบสุดท้าย 18:00
