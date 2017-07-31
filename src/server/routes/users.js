const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretToken = require('../config').secretToken;

const router = express.Router();

/* GET all users */
router.get('/', async (req, res) => {
	try {
		const rows = await User.getAll();
		res.json(rows);
	} catch (err) {
		res.status(400).send({ error: 'Failed to get all users' });
	}
});

/* GET a specific user by id */
router.get('/:user_id', async (req, res) => {
	try {
		const rows = await User.getByID(req.params.user_id);
		res.json(rows);
	} catch (err) {
		res.status(400).send({ error: 'Failed to get user' });
	}
});

/* GET a specific user by username */
router.get('/username/:username', async (req, res) => {
	try {
		const rows = await User.getByUsername(req.params.username);
		res.json(rows);
	} catch (err) {
		res.status(400).send({ error: 'Failed to get user' });
	}
});

/* Create a new user */
router.post('/', async (req, res) => {
	try {
		if (req.body.username.length > 15 || req.body.password.length < 6 || req.body.password.length > 50) {
			res.status(400).send({ error: 'Failed to create new user' });
		} else {
			const hash = bcrypt.hashSync(req.body.password, 10);
			const id = await new User(undefined, req.body.username, req.body.email, hash).insert();
			const user = await User.getByID(id);
			const token = jwt.sign(user, secretToken, { expiresIn: 86400 });
			res.json({ user: user, token: token	});
		}
	} catch (err) {
		res.status(400).send({ error: 'Failed to create new user' });
	}
});

module.exports = router;
