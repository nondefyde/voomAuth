import {
	apiRequest,
	LOGIN,
	LOGOUT,
	navigateTo,
	POST,
	REGISTER,
	RESEND_VERIFY,
	RESET_PASSWORD,
	SOCIAL,
	UPDATE_PASSWORD,
	VERIFY,
	VERIFY_LINK
} from '../actions';
import API from '../../constants/api';
import APP from '../../constants/app';
import authservice from '../../services/auth';
import { CHANGE_PASSWORD } from '../actions/auth';

const social = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === SOCIAL.START) {
		const data = action.payload;
		dispatch(apiRequest({
			method: POST,
			url: `${API.SOCIAL}/${data.provider}`,
			key: 'social',
			nextRoute: APP.INDEX,
			onSuccess: SOCIAL.SUCCESS,
			payload: data
		}));
	}
};

const login = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === LOGIN.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.LOGIN,
			key: 'login',
			onSuccess: LOGIN.SUCCESS,
			payload: action.payload
		}));
	}

	if (action.type === LOGIN.SUCCESS) {
		const {user} = action.payload;
		if (user.account_verified) {
			dispatch(navigateTo(APP.INDEX));
		} else {
			console.log('verify user ', user);
			dispatch(navigateTo(APP.VERIFY));
		}
	}
};

const register = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === REGISTER.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.REGISTER,
			key: 'register',
			nextRoute: APP.INDEX,
			onSuccess: LOGIN.SUCCESS,
			payload: action.payload
		}));
	}

	if (action.type === REGISTER.SUCCESS) {
		const {user} = action.payload;
		if (user.account_verified) {
			dispatch(navigateTo(APP.INDEX));
		} else {
			console.log('verify user ', user);
			dispatch(navigateTo(APP.VERIFY));
		}
	}
};


const verify = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === VERIFY.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.VERIFY_CODE,
			key: 'verify',
			nextRoute: APP.INDEX,
			onSuccess: VERIFY.SUCCESS,
			payload: action.payload
		}));
	}
};

const verifyLink = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === VERIFY_LINK.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.VERIFY_LINK,
			key: 'verifyLink',
			nextRoute: APP.INDEX,
			onSuccess: VERIFY.SUCCESS,
			payload: action.payload
		}));
	}
	if (action.type === VERIFY_LINK.ERROR) {
		dispatch(navigateTo(APP.LOGIN));
	}
};

const resendVerify = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === RESEND_VERIFY.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.RESEND_VERIFICATION_CODE,
			key: 'resendVerify',
			onSuccess: RESEND_VERIFY.SUCCESS,
			payload: action.payload
		}));
	}
};

const resetPassword = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === RESET_PASSWORD.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.RESET_PASSWORD,
			key: 'resetPassword',
			nextRoute: APP.LOGIN,
			payload: action.payload
		}));
	}
};

const updatePassword = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === UPDATE_PASSWORD.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.UPDATE_PASSWORD,
			key: 'updatePassword',
			nextRoute: APP.LOGIN,
			payload: action.payload
		}));
	}
};

const changePassword = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === CHANGE_PASSWORD.START) {
		dispatch(apiRequest({
			method: POST,
			url: API.CHANGE_PASSWORD,
			key: 'updatePassword',
			onSuccess: CHANGE_PASSWORD.SUCCESS,
			payload: action.payload
		}));
	}
};


const logout = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === LOGOUT.START) {
		authservice.logoutUser();
		dispatch({type: LOGOUT.SUCCESS});
	}
	if (action.type === LOGOUT.SUCCESS) {
		dispatch(navigateTo(APP.LOGIN));
	}
};


export default [social, login, register, verify, verifyLink, resendVerify, resetPassword, updatePassword, changePassword, logout];
