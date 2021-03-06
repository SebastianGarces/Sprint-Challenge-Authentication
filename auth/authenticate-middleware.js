/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) res.status(401).json({ you: "shall not pass!" });

	req.decodedToken = jwt.decode(token);

	next();
};
