"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Movie = mongoose.model("Movie");

const movieCtrl = {
  getmovie: (req, res) => {
    Movie.find().exec((err, movie) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(movie);
    });
  },

  createmovie: (req, res) => {
    const movie = new Movie(req.body);
    movie.save((err, resMovie) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(resMovie);
    });
  },

  updatemovie: (req, res) => {
    Movie.findById(req.body._id).exec((err, movie) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (movie) {
        movie.name = req.body.name;
        movie.save((err, resmovie) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json(resmovie);
        });
      } else {
        res.json({
          err: "ลบไม่สำเร็จ",
        });
      }
    });
  },

  deletemovie: (req, res) => {
    Movie.findById(req.body._id).exec((err, movie) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (movie) {
        movie.remove((err) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.json({
            Status: "dalete success",
          });
        });
      } else {
        res.json({
          err: "ลบไม่สำเร็จ",
        });
      }
    });
  },
};

module.exports = movieCtrl;
