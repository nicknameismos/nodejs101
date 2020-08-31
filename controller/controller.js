"use strict";

const ctrl = {
  getHome: (req, res) => {
    res.send("hello" + req.query.id);
  },

  getbyid: (req, res) => {
    res.send("hello" + req.params.id);
  },

  posthome: (req, res) => {
    res.json({
      result: req.body.test,
    });
  },

  ///////////////////////////

  getNum1: (req, res) => {
    res.json({
      total: Number(req.params.firstNum) + Number(req.params.secoundNum),
    });
  },

  getNum2: (req, res) => {
    res.json({
      total: Number(req.query.firstNum) * Number(req.query.secoundNum),
    });
  },

  postNum: (req, res) => {
    let result = [];
    req.body.forEach((itm) => {
      result.push({
        displayname: itm.firstname + " " + itm.lastname,
        age: itm.age,
      });
    });
    result = result.sort((a, b) => {
      if (a.age < b.age) {
        return -1;
      }
      if (a.age > b.age) {
        return 1;
      }
      return 0;
    });
    res.json(result);
  },
  postSomting: (req, res) => {
    res.json(req.body);
  },

  getSomting: (req, res) => {
    // res.send("id" + req.query.id);
    res.json({
      id: req.query.id,
    });
    /*
    get /somthings?id=1

    {
      "id":1
    }
    */
  },
  getSomtingbyid: (req, res) => {
    // res.send("id" + req.params.id);
    res.json({
      id: req.params.id,
    });
    /*
    get /somthings/1

    {
      "id":1
    }
    */
  },
};

module.exports = ctrl;
