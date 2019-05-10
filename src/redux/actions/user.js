import { createActionType } from '../../utils/index';

// Users
export const CREATE_USER = createActionType('CREATE_USER', 'Users');
export const UPDATE_USER = createActionType('UPDATE_USER', 'Users');
export const DELETE_USER = createActionType('DELETE_USER', 'Users');
export const FETCH_USER = createActionType('FETCH_USER', 'Users');
export const FETCH_USERS = createActionType('FETCH_USERS', 'Users');
export const UPDATE_USER_SESSION = '@@ [UPDATE_USER_SESSION]';

export const createUser = (payload) => ({
	type: CREATE_USER.START,
	payload
});

export const updateUser = (payload) => ({
	type: UPDATE_USER.START,
	payload
});

export const deleteUser = (id) => ({
	type: DELETE_USER.START,
	id
});

export const fetchUser = (id) => ({
	type: FETCH_USER.START,
	id
});

export const fetchUsers = (params = {}) => ({
	type: FETCH_USERS.START,
	params
});

export const updateUserSession = (payload) => ({
	type: UPDATE_USER_SESSION,
	payload
});
