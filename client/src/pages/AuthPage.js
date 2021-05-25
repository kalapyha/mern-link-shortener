import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

function AuthPage() {
	const auth = useContext(AuthContext);

	const message = useMessage();
	const { loading, error, request, clearError } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		message(error);
		clearError(error);
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	// Handlers
	const onChangeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/registration', 'POST', form);
			message(data.message);
		} catch (error) {}
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', form);
			message(data.message);
			auth.login(data.token, data.userId);
		} catch (error) {}
	};

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Shorten your link</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title"> Authorization </span>
						<div>
							<div className="input-field">
								<input
									placeholder="Email address"
									id="email"
									type="text"
									name="email"
									value={form.email}
									onChange={onChangeHandler}
									disabled={loading}
								/>
								<label htmlFor="email">Your Email</label>
							</div>

							<div className="input-field">
								<input
									placeholder="Password"
									id="password"
									type="password"
									name="password"
									value={form.password}
									onChange={onChangeHandler}
									disabled={loading}
								/>
								<label htmlFor="password">Your Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4 waves-effect waves-light mr-1"
							onClick={loginHandler}
						>
							Login
						</button>
						<button
							className="btn grey lighten-1 black-text waves-effect waves-light"
							onClick={registerHandler}
						>
							Register
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthPage;
