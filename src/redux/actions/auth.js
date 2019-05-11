import { createActionType } from '../../utils/index';

// Users
export const SOCIAL = createActionType('SOCIAL', 'auth');
export const LOGIN = createActionType('LOGIN', 'auth');
export const REGISTER = createActionType('REGISTER', 'auth');
export const RESET_PASSWORD = createActionType('RESET_PASSWORD', 'auth');
export const UPDATE_PASSWORD = createActionType('UPDATE_PASSWORD', 'auth');
export const VERIFY = createActionType('VERIFY', 'auth');
export const VERIFY_LINK = createActionType('VERIFY_LINK', 'auth');
export const RESEND_VERIFY = createActionType('RESEND_VERIFY', 'auth');
export const LOGOUT = createActionType('LOGOUT', 'auth');
export const CHANGE_PASSWORD = createActionType('CHANGE_PASSWORD', 'auth');

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

export const resetPassword = (payload) => ({
	type: RESET_PASSWORD.START,
	payload
});

export const updatePassword = (payload) => ({
	type: UPDATE_PASSWORD.START,
	payload
});

export const changePassword = (payload) => ({
	type: CHANGE_PASSWORD.START,
	payload
});

export const verify = (payload) => ({
	type: VERIFY.START,
	payload
});

export const verifyLink = (payload) => ({
	type: VERIFY_LINK.START,
	payload
});

export const resendVerify = (payload) => ({
	type: RESEND_VERIFY.START,
	payload
});

export const logout = () => ({
	type: LOGOUT.START,
});