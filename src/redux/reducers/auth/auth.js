import { LOGIN, LOGOUT, REGISTER, RESEND_VERIFY, SOCIAL } from '../../actions';
import { VERIFY } from '../../actions/auth';

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
	case RESEND_VERIFY.SUCCESS:
	case VERIFY.SUCCESS:
		return Object.assign({}, state, {
			...state, user: action.payload
		});
	case LOGOUT.SUCCESS:
		return Object.assign({}, state, {
			...state, user: undefined, session: undefined
		});
	default:
		return state;
	}
};

export default userReducer;
