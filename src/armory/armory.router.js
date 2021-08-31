const router = require('express').Router();
const controller = require("./armory.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const dungeonsRouter = require("../dungeons/dungeons.router");

router.use("/dungeons", dungeonsRouter);
  

module.exports = router;