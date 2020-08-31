"use strict";
const mongoose = require("mongoose");
const cfg = require("./config");
const path = require("path");
const _ = require("lodash");
const glob = require("glob");
const mongo_uri = cfg.mongoUri;
const mongoDB = {
  loadModel: (callback) => {
    let defaultAssets = require(path.join(process.cwd(), "assets/default"));
    const globPatterns = defaultAssets.mongo.models;
    let urlRegex = new RegExp("^(?:[a-z]+:)?//", "i");
    // The output array
    let output = [];
    if (_.isString(globPatterns)) {
      if (urlRegex.test(globPatterns)) {
        output.push(globPatterns);
      } else {
        let files = glob.sync(globPatterns);
        output = _.union(output, files);
      }
    }
    output.forEach(function (modelPath) {
      require(path.resolve(modelPath));
    });
    if (callback) callback();
  },
  connect: (cb) => {
    mongoose.Promise = global.Promise;
    const db = mongoose
      .connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(
        () => {
          if (cb) cb(db);
          console.log("[success] task 2 : connected to the database ");
        },
        (error) => {
          console.log("[failed] task 2 " + error);
          process.exit();
        }
      );
  },
  initMongoDB: () => {
    mongoDB.connect();
    mongoDB.loadModel();
  },
};

module.exports = mongoDB;
