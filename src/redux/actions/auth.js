import { createActionType } from '../../utils/index';

// Users
export const SOCIAL = createActionType('SOCIAL', 'auth');
export const LOGIN = createActionType('LOGIN', 'auth');
export const REGISTER = createActionType('REGISTER', 'auth');
export const VERIFY_USER = createActionType('VERIFY_USER', 'auth');
export const LOGOUT = createActionType('LOGOUT', 'auth');

export const login = (payload) => ({
	type: LOGIN.START,
	payload
});

export const social = (payload) => ({
	type: SOCIAL.START,
	payload
});

export const register = (payload) => ({
	type: REGISTER.START,
	payload
});

export const logout = (payload) => ({
	type: LOGOUT.START,
	payload
});