const router = require('express').Router();
const controller = require("./dungeons.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/:dungeonName")
  .get(controller.read)
  .all(methodNotAllowed);
  

router.route("/")
  .get(controller.getAllDungeons)
  .all(methodNotAllowed);


module.exports = router;