import { validateToken } from "../utils/authentication.js";

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.uid;

  if (!token) {
    req.user = null;
    res.locals.user = null;
    return next();
  }

  try {
    req.user = validateToken(token);
    res.locals.user = req.user;
  } catch (err) {
    req.user = null;
    res.locals.user = null;
  }
  next();
}


function checkUserAuthentication(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    return res.status(401).redirect("/login");
  }
  try {
    req.user = validateToken(token);
    next();
  } catch (error) {
    return res.status(401).redirect("/login");
  }
}

export { checkForAuthentication, checkUserAuthentication };
