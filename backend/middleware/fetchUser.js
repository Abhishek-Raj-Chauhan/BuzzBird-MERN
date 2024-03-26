const jwt = require("jsonwebtoken");
const JWT_SECRET = "abhishekisagoodb$oy";
const fetchUser = (req, res, next) => {
  //Get the user from jwt token and add id to req object 'user'
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.userId;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
