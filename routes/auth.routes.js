const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const brcypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

// /api/auth/register
router.get('/registration', (req, res) => {
	res.status(200).json({ message: 'hello from GET' });
});

//@route  GET api/auth/registration:id
//@desc   Get user by ID
//@access Public
router.get('/registration/:id', async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id }, { explicit: true });
		console.log('USER', user);

		// TODO
		if (!user) {
			return res.status(400).json({
				errors: [{ message: 'User with this ID was not found' }],
			});
		}

		res.status(200).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Something wrong, please try again', errors: error });
	}
});

//@route  POST api/auth/registration
//@desc   Register user
//@access Public
router.post(
	'/registration',
	[
		check('email', 'Please provide a valid email address').isEmail(),
		check('password', 'Password should be at least 6 characters').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid registration parameters!',
				});
			}
			const { email, password } = req.body;

			// Check if user exists

			const candidate = await User.findOne({ email });
			if (candidate) {
				return res.status(400).json({
					errors: [{}],
					message: 'User with specified email already exist',
				});
			}
			const hashedPassword = await brcypt.hash(password, 10);

			const user = new User({ email, password: hashedPassword });
			const registeredUser = await user.save(user);

			res
				.status(201)
				.json({ message: 'You have been registered!', registeredUser });
			// TODO Do I need to send token here?
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Something wrong, please try again', errors: error });
		}
	}
);

//@route  POST api/auth/login
//@desc   Login user
//@access Public
router.post(
	'/login',
	[
		check('email', 'Please provide a valid email address').isEmail(),
		check('password', 'Password required').notEmpty(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Invalid login parameters!',
				});
			}
			const { email, password } = req.body;

			// Check if user exists
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					errors: [{}],
					message: "User with specified email doesn't exist",
				});
			}
			// Validate password
			const isValidPassword = await brcypt.compare(password, user.password);

			if (!isValidPassword) {
				return res.status(400).json({
					errors: [{}],
					message: 'Wrong password',
				});
			}
			// Create token
			const token = jwt.sign({ userId: user.id }, config.get('tokenKey'), {
				expiresIn: '1h',
			});

			// Send token and userId
			res
				.status(200)
				.json({ message: 'Hello from Login', token, userId: user.id });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'Something wrong, please try again', errors: error });
		}
	}
);
module.exports = router;
