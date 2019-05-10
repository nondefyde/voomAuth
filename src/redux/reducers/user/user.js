import { CREATE_USER, } from '../../actions/index';
import { FETCH_USER, LOGIN, REGISTER, UPDATE_USER, VERIFY_USER } from '../../actions';
import { byIdToByCreatedAt } from '../utils';

const defaultState = {
	current: undefined,
	byId: {},
	byCreatedAt: [],
};

const userReducer = (state = defaultState, action) => {
	switch (action.type) {
	case CREATE_USER.SUCCESS:
	case FETCH_USER.SUCCESS:
		return Object.assign({}, state, {current: action.payload});
	case UPDATE_USER.SUCCESS:
		const current = state.current ? {...state.current, ...action.payload} : action.payload;
		const update = {current};
		if (state.byId[current._id]) {
			update.byId = {...state.byId, [current._id]: current};
			update.byCreatedAt = byIdToByCreatedAt(update.byId);
		}
		return Object.assign({}, state, update);
	default:
		return state;
	}
};

export default userReducer;
