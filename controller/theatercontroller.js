"use strict";
// const User = require("../models/user");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Theater = mongoose.model("Theater");

const theaterCtrl = {
  createtheater: (req, res) => {
    const datamovie = req.body;

    let round1 = new Date();
    round1.setHours(9);
    round1.setMinutes(0);

    let round2 = new Date();
    round2.setHours(12);
    round2.setMinutes(0);

    let round3 = new Date();
    round3.setHours(18);
    round3.setMinutes(0);

    let vipseat = seat(["vip"], 500, 6);
    let acseat = seat(["a", "b", "c"], 220, 24);
    let dfseat = seat(["d", "e", "f"], 180, 24);
    let ghseat = seat(["g", "h"], 140, 24);

    let dataSeat = [];
    // []
    dataSeat = dataSeat.concat(vipseat);
    // [vip]
    dataSeat = dataSeat.concat(acseat);
    // [vip, a-c]
    dataSeat = dataSeat.concat(dfseat);
    // [vip, a-c, d-f]
    dataSeat = dataSeat.concat(ghseat);
    // [vip, a-c,d-f,gh]

    const theater = new Theater({
      movie: datamovie,
      data: new Date(),
      round: [
        {
          name: "รอบแรก",
          time: round1,
          seat: dataSeat,
        },
        {
          name: "รอบที่2",
          time: round2,
          seat: dataSeat,
        },
        {
          name: "รอบสุดท้าย",
          time: round3,
          seat: dataSeat,
        },
      ],
      // round: [
      //   {
      //     name: {
      //       type: String,
      //     },
      //     time: {
      //       type: Date,
      //     },
      //     seat: [
      //       {
      //         type: {
      //           type: String,
      //         },
      //         price: {
      //           type: Number,
      //         },
      //         status: {
      //           type: String,
      //         },
      //       },
      //     ],
      //   },
      // ],
    });

    theater.save((err, resTheater) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(resTheater);
    });
  },

  gettheater: (req, res) => {
    Theater.find().exec((err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(data);
    });
  },

  updateIsshow: (req, res) => {
    Theater.findById(req.body._id).exec((err, thearter) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (thearter) {
        thearter.round.forEach((itm) => {
          if (itm.name == req.body.name) {
            itm.isShow = false;
          }
        });
        thearter.save((err, restherter) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json(restherter);
        });
      } else {
        res.json({
          err: "มั่ว",
        });
      }
    });
  },

  cacelround: (req, res) => {
    // ยกเลิกฉาย
    Theater.findById(req.body._id).exec((err, thearter) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (thearter) {
        thearter.round.forEach((itm) => {
          if (itm._id == req.body.roundId) {
            console.log(itm._id + "---" + req.body.roundId);
            itm.isShow = false;
            console.log(itm);
          }
        });
        thearter.save((err, restherter) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json(restherter);
        });
      } else {
        res.json({
          err: "มั่ว",
        });
      }
    });
  },
};

const seat = (type, price, seatNo) => {
  let result = [];
  // ["a". "b", "c"]
  type.forEach((element) => {
    // seatNo 24
    for (let i = 0; i < seatNo; i++) {
      result.push({
        type: element,
        price: price,
        status: "ว่าง",
        seatNo: i + 1,
      });
    }
  });

  return result;
};
module.exports = theaterCtrl;
