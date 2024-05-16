// CommonJS syntax
const jwt = require("jsonwebtoken");
const UserToken = require("../models/UserToken.js");


const generateTokens = async (user) => {
	try {
		const payload = { userId: user._id,email: user.email, roles: user.userRole };
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_PRIVATE_KEY,
			{ expiresIn: "5s" }
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.REFRESH_TOKEN_PRIVATE_KEY,
			{ expiresIn: "30d" }
		);

		const userToken = await UserToken.findOne({ username: user.username });
		if (userToken) {
		
			await userToken.remove();
			await new UserToken({ userId: user._id, token: refreshToken }).save();
			return Promise.resolve({ accessToken, refreshToken })
		}
else{
	await new UserToken({ userId: user._id, token: refreshToken }).save();
		return Promise.resolve({ accessToken, refreshToken });
	}
	} catch (err) {
		return Promise.reject(err);
	}
};

module.export = generateTokens;