import { createActionType } from '../../utils/index';

// Users
export const SOCIAL = createActionType('SOCIAL', 'auth');
export const LOGIN = createActionType('LOGIN', 'auth');
export const REGISTER = createActionType('REGISTER', 'auth');
export const VERIFY = createActionType('VERIFY', 'auth');
export const RESEND_VERIFY = createActionType('RESEND_VERIFY', 'auth');
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

export const verify = (payload) => ({
	type: VERIFY.START,
	payload
});

export const resendVerify = (payload) => ({
	type: RESEND_VERIFY.START,
	payload
});

export const logout = () => ({
	type: LOGOUT.START,
});