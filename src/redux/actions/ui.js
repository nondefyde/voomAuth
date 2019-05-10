import { createActionString, createActionType } from '../../utils';

export const UI_LOADING = createActionType('UI_LOADING', 'UI');
export const UI_ERROR = createActionString('UI_ERROR', 'UI');
export const UI_NAVIGATE = createActionString('UI_NAVIGATE', 'UI');
export const UI_SET_PAGINATION = createActionType('UI_SET_PAGINATION', 'UI');

export const startUILoading = (key) => ({
	type: UI_LOADING.START,
	key
});

export const stopUILoading = (key) => ({
	type: UI_LOADING.END,
	key
});

export const updateUIError = (key, value) => ({
	type: UI_ERROR,
	key,
	value
});

export const uiSetPagination = (key, payload) => ({
	type: UI_SET_PAGINATION.START,
	meta: {
		key,
		payload
	}
});

export const navigateTo = (path) => ({
	type: UI_NAVIGATE,
	payload: path
});
