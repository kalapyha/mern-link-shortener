const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

// const PORT = config.get('port');
const PORT = process.env.PORT || 8080;

const app = express();

// Middleware
app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const start = async () => {
	try {
		await mongoose.connect(
			config.get('mongooseUri'),
			{ useNewUrlParser: true, useUnifiedTopology: true },
			() => {
				console.log('Mongoose connected');
			}
		);

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}...`);
		});
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
start();
