const router = require("express").Router();
const controller = require("./connections.controller");

router.route("/get_access_token")
  .get(controller.getAccessToken);

module.exports = router;