import ApiError from "../utils/apiError.js";
import { validateToken } from "../utils/authentication.js";

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.uid;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = validateToken(token);
  } catch (err) {
    req.user = null;
  }
  next();
}

function checkUserAuthentication(req, res, next) {
  const token = req.cookies?.uid;
  if (!token) {
    throw new ApiError(401, "Unauthorized")
  }
  try {
    req.user = validateToken(token);
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired Token")
  }
}

export { checkForAuthentication, checkUserAuthentication };
