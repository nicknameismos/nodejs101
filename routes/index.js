"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
// const controllerUser = require("../controller/userctrl");
const userCtrl = require("../controller/userctrl");
const theaterController = require("../controller/theatercontroller");
const movieController = require("../controller/moviecontroller");
const { cacelround } = require("../controller/theatercontroller");

router.get("/home", controller.getHome);

router.get("/home/:id", controller.getbyid);

router.post("/home", controller.posthome);

////////////////////
router.get("/test/:firstNum/:secoundNum", controller.getNum1);
//http://localhost:8888/test/5/6

router.get("/test", controller.getNum2);
//http://localhost:8888/test?firstNum=2&secoundNum=5

router.post("/concatstring", controller.postNum);
// http://localhost:8888/concatstring

// getuser routes
router.get("/user", userCtrl.getuser);

router.post("/user", userCtrl.createuser);

router.put("/user", userCtrl.updateuser);

router.delete("/user", userCtrl.deleteuser);

router.get("/userasc", userCtrl.orderasc);
//เรียงจากน้อยไปมาก
router.get("/userdesc", userCtrl.orderdesc);
//เรียงจากมากไปน้อย

router.post("/searchByname", userCtrl.searchByname);

// test 29-8-63
router.post("/somthings", controller.postSomting);
router.get("/somthings", controller.getSomting);
router.get("/somthings/:id", controller.getSomtingbyid);

//////////////////////////////////// Movie Routes ////////////////////////////////////
router.get("/movie", movieController.getmovie);
router.post("/movie", movieController.createmovie);
router.put("/movie", movieController.updatemovie);
router.delete("/movie", movieController.deletemovie);

router.post("/round", theaterController.createtheater);
router.get("/round", theaterController.gettheater);
router.put("/round", theaterController.updateIsshow);
router.put("/round2", theaterController.cacelround);

module.exports = router;
