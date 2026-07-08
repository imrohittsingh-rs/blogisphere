import jwt from "jsonwebtoken";

function generateTokenForUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
    fullName: user.fullname,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
}

export { generateTokenForUser, validateToken };
