//we export a function and this function is a middleware
//next is a functiin that we call and pass it to the next middleware
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(403).send({ error: "You must log in!" });
  }
  next();
};
