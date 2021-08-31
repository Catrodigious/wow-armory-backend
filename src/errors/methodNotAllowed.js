function methodNotAllowed(req, res, next){
  next({status: 403, message: `${req.method} on ${req.originalUrl} is not allowed.`});
}

module.exports = methodNotAllowed;