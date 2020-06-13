const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");
const secrets = require("../config/secrets");

// registers new user
router.post("/register", async (req, res) => {
	const user = req.body;

	const hash = bcrypt.hashSync(user.password, 10);

	user.password = hash;

	try {
		const newUser = await Users.add(user);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

// logins user
router.post("/login", async (req, res) => {
	let { username, password } = req.body;

	try {
		const user = await Users.findBy({ username }).first();
		console.log("FOUND USER PASSWORD", user.password);
		console.log("BODY PASSWORD", password);
		console.log("HASHES ARE EQUAL", password === user.password);
		console.log("BCRYPTJS: ", bcrypt.compareSync(password, user.password));

		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);

			res.status(200).json({
				message: `Welcome ${user.username}!`,
				token,
			});
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// token generation
function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department,
	};

	const options = {
		expiresIn: "1h",
	};

	return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
