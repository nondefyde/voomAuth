import { apiRequest, POST, UPDATE_PROFILE } from '../actions';
import API from '../../constants/api';

const updateProfile = ({dispatch}) => (next) => (action) => {
	next(action);
	if (action.type === UPDATE_PROFILE.START) {
		const {...rest} = action.meta;
		dispatch(apiRequest({
			method: POST,
			url: `${API.USER_PROFILE}`,
			key: 'updateProfile',
			onSuccess: UPDATE_PROFILE.SUCCESS,
			...rest
		}));
	}
};

export default [updateProfile];
