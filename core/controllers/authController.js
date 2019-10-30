const jwt = require('jsonwebtoken');
const bcrypt = require('../utils/bcrypt');
const Users = require('../db/models/users');

const secret = process.env.JWT_SECRET || 'pm-secret';
const msg = {
	wrongValue: 'Incorrect username and/or password.'
};

module.exports = {
	signup: async ctx => {
		const { username, password } = ctx.request.body;
		if (!username) ctx.throw(422, 'Username required.');
		if (!password) ctx.throw(422, 'Password required.');

		const dbUser = await Users.create(username, await bcrypt.hash(password))

		const payload = { sub: dbUser.id };
		const token = jwt.sign(payload, secret);
		ctx.body = token;
	},

	login: async ctx => {
		const { username, password } = ctx.request.body;
		if (!username) ctx.throw(422, 'Username required.');
		if (!password) ctx.throw(422, 'Password required.');

		const dbUser = await Users.getOne('username', username)

		if (!dbUser) ctx.throw(401, 'No such user.');
		if (await bcrypt.compare(password, dbUser.password)) {
			const payload = { sub: dbUser.id };
			const token = jwt.sign(payload, secret);
			ctx.body = token;
		} else {
			ctx.throw(401, msg.wrongValue);
		}
	}
}
