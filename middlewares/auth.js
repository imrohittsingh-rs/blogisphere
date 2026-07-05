import jwt from "jsonwebtoken";

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Authenticated user:", user);
    req.user = user;
  } catch (error) {
    req.user = null;
  }
  next();
}

function checkUserAuthentication(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    return res.status(401).redirect("/login");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).redirect("/login");
  }
}

module.exports = {
  checkForAuthentication,
  checkUserAuthentication,
};
