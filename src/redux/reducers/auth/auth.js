import { LOGIN, LOGOUT, REGISTER, SOCIAL, VERIFY_USER } from '../../actions';

const defaultState = {
	user: undefined,
	session: undefined
};

const userReducer = (state = defaultState, action) => {
	switch (action.type) {
	case SOCIAL.SUCCESS:
	case LOGIN.SUCCESS:
	case REGISTER.SUCCESS:
		return Object.assign({}, state, action.payload);
	case VERIFY_USER.SUCCESS:
		return Object.assign({}, state, {
			...state, data: action.payload
		});
	default:
		return state;
	}
};

export default userReducer;
