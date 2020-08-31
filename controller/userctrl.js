"use strict";
// const User = require("../models/user");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const userCtrl = {
  getuser: (req, res) => {
    User.find().exec((err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(data);
    });
  },

  createuser: (req, res) => {
    const user = new User(req.body);
    user.save((err, resuser) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(resuser);
    });
  },

  updateuser: (req, res) => {
    User.findById(req.body._id).exec((err, user) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (user) {
        user.name = req.body.name;
        user.save((err, resuser) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json(resuser);
        });
      } else {
        res.json({
          err: "มั่ว",
        });
      }
    });
  },

  deleteuser: (req, res) => {
    User.findById(req.body._id).exec((err, user) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (user) {
        // user.name = req.body.name;
        user.remove((err) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json({
            Status: "dalete success",
          });
        });
      } else {
        res.json({
          err: "ลบมั่ว",
        });
      }
    });
  },

  //เรียงจากน้อยไปมาก
  orderasc: (req, res) => {
    User.find()
      .sort({ name: 1 })
      .exec((err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json(data);
      });
  },

  //เรียงจากมากไปน้อย
  orderdesc: (req, res) => {
    User.find()
      .sort({ name: -1 })
      .exec((err, data) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json(data);
      });
  },

  //ค้นหาชื่อ ที่ตรงกันไม่สนใจตัวพิมพ์เล็ก ใหญ่
  searchByname: (req, res) => {
    const name = req.body.keyword;
    // User.findOne({ name: new RegExp("^" + name + "$", "i") }, (err, doc) => {
    //   if (err) {
    //     return res.status(500).json(err);
    //   }
    //   res.json(doc);
    // });

    //ค้นหาทั้งหมด
    User.find({ name: new RegExp("^" + name, "i") }, (err, doc) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(doc);
    });
  },
};

module.exports = userCtrl;
