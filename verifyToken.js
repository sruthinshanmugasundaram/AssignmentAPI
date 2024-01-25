const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Received Token:", authHeader);
  if (!authHeader) {
    console.log("Token missing");
    return res.status(401).json({ error: "You are not authenticated!" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("Invalid token format");
    return res.status(401).json({ error: "You are not authenticated!" });
  }

  try {

    const decoded = jwt.decode(token,process.env.SECRET_KEY);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ error: "Token is not valid!" });
  }
}

module.exports = verify;
