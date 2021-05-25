import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
	useId: null,
	token: null,
	login: noop,
	logout: noop,
	isAuthenticated: false,
});
