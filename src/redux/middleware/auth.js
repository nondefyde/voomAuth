import { apiRequest, LOGIN, POST, REGISTER, SOCIAL } from '../actions';
import API from '../../constants/api';
import APP from '../../constants/app';

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
			nextRoute: APP.INDEX,
			onSuccess: LOGIN.SUCCESS,
			payload: action.payload
		}));
	}

	if (action.type === LOGIN.SUCCESS) {
		console.log('action : ', action.payload);
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

	if (action.type === LOGIN.SUCCESS) {
		console.log('action : ', action.payload);
	}
};

export default [social, login, register];
