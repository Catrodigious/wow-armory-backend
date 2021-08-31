function notFound(req, res, next){
  next({status: 404, message: `${req.originalUrl} was not found.`})
}

module.exports = notFound;