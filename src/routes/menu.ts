/// <reference path="../../typings/main.d.ts"/>
import express = require("express");
let router = express.Router();


router.get("/", function(req, res, next){
  res.render("menu");
});

module.exports = router;
