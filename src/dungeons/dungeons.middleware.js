function validateParamsAndBody(req, res, next){
  const { dungeonName } = req.params;
  const { data: {filename = null } = {} } = req.body;

  console.log("req.body: ", req.body);
  if (dungeonName.toLowerCase() !== "deotherside"){
    return next({status: 404, message: `Dungeon ${dungeonName} not found`})
  }

  if (!filename) return next({status: 400, message: "Please provide a save path for this data"});

  res.locals.dungeonName = dungeonName;
  res.locals.filename = filename;
  next();
}

module.exports = {
  validateParamsAndBody
}